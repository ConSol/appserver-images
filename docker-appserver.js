#!/usr/local/bin/node

var dot = require('dot');
var fs = require('fs');
var colors = require('colors');
var _ = require('underscore');
JSON.minify = JSON.minify || require("node-json-minify");

var servers = [ "tomcat" ];

dot.templateSettings.strip = false;

var globalConfig = {};
if (fs.existsSync("config.json")) {
    globalConfig = JSON.parse(JSON.minify(fs.readFileSync("config.json", "utf8")));
}

servers.forEach(function(server) {
    console.log(server);
    var config =
        _.extend({},
            globalConfig,
            JSON.parse(JSON.minify(fs.readFileSync(server + "/servers.json", "utf8"))));
    var versions = config.versions;
    execWithTemplates(server,function(templates) {
        versions.forEach(function (version) {
            console.log("    " + version);
            ensureDir(server + "/" + version);
            var changed = false;
            templates.forEach(function (template) {
                var file = checkForMapping(config,version,template.file);
                if (!file) {
                    // Skip any file flagged as being mapped but no mapping was found
                    return;
                }
                var templateHasChanged =
                    fillTemplate(
                            server + "/" + version + "/" + file,
                        template.templ,
                        _.extend({ "version": version },config));
                changed = changed || templateHasChanged;
            });
            if (!changed) {
                console.log("       UNCHANGED".yellow);
            }
        });
    });
});

function checkForMapping(config,version,file) {
    if (/^__.*$/.test(file)) {
        var mappings = config.mappings || {};
        var mapping = mappings[version] || {};
        return mapping[file];
    } else {
        return file;
    }
}

function execWithTemplates(server,templFunc) {
    var templ_dir = server + "/templates";
    fs.readdir(templ_dir,function(err,templates) {
        var ret = [];
        if (err) throw err;
        templates.forEach(function (template) {
            ret.push({
                "templ" : dot.template(fs.readFileSync(templ_dir + "/" + template)),
                "file" : template
            });
        });
        templFunc(ret);
    });
}

function fillTemplate(file,template,config) {
    var newContent = template(config).trim();
    var label = file.replace(/.*\/([^\/]+)$/,"$1");
    if (!newContent.length) {
        console.log("       " + label + ": " + "SKIPPED".grey);
        return false;
    } else {
        var exists = fs.existsSync(file);
        var oldContent = exists ? fs.readFileSync(file, "utf8").trim() : undefined;
        if (newContent !== oldContent) {
            console.log(newContent);
            console.log("       " + label + ": " + (exists ? "CHANGED".green : "NEW".yellow));
            return true;
        }
    }
    return false;
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir,0755);
    }
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        throw new Error(dir + " is not a directory");
    }
}
