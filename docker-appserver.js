#!/usr/local/bin/node

var dot = require('dot');
dot.templateSettings.strip = false;

var fs = require('fs');
var colors = require('colors');
var _ = require('underscore');
JSON.minify = JSON.minify || require("node-json-minify");

var opts = parseOpts();

//console.info(opts);

// All supported servers which must be present as a sub-directory
var servers = getServers(opts);

var globalConfig = {};
if (fs.existsSync("config.json")) {
    globalConfig = JSON.parse(JSON.minify(fs.readFileSync("config.json", "utf8")));
}

servers.forEach(function(server) {
    console.log(server);
    var config =
        _.extend({},
            globalConfig,
            getServersConfig(server));
    var versions = extractVersions(config);
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
                        _.extend(
                            {},
                            config,
                            { "version": version,
                              "config": _.extend({},config.meta['default'],config.meta[version])}
                        ));
                changed = changed || templateHasChanged;
            });
            if (!changed) {
                console.log("       UNCHANGED".yellow);
            } else {

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
    var newContent = template(config).trim() + "\n";
    var label = file.replace(/.*\/([^\/]+)$/,"$1");
    if (!newContent.length) {
        console.log("       " + label + ": " + "SKIPPED".grey);
        return false;
    } else {
        var exists = fs.existsSync(file);
        var oldContent = exists ? fs.readFileSync(file, "utf8") : undefined;
        if (newContent.trim() !== oldContent.trim()) {
            console.log("       " + label + ": " + (exists ? "CHANGED".green : "NEW".yellow));
            fs.writeFileSync(file,newContent,{ "encoding" : "utf8"});
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

function parseOpts() {
    var Getopt = require('node-getopt');
    var getopt = new Getopt([
        ['s' , 'server=ARG+', 'Servers for which to create container images (e.g. "tomcat")'],
        ['v' , 'version=ARG+', 'Versions of a given server to create (e.g. "7.0" for tomcat)'],
        ['h' , 'help'                , 'display this help']
    ]);

    var help =
        "Usage: node docker-appserver.js [OPTION]\n" +
        "Generator for automated Docker builds.\n" +
        "\n" +
        "[[OPTIONS]]\n" +
        "\n" +
        "This script creates so called 'automated builds' for Java application server\n" +
        "which can be registered at hub.docker.io\n\n" +
        "It uses templates for covering multiple version of appserver.\n\n" +
        "Supported servers:\n\n";
    var servers = getAllServers();
    servers.forEach(function (server) {
        var config = getServersConfig(server);
        help += "   " + server  + ": " + config.versions.join(", ") + "\n";
    });

    return getopt.bindHelp(help).parseSystem();
}

function getServers(opts) {
    if (opts.options.server) {
        return _.filter(getAllServers(), function (server) {
            return _.contains(opts.options.server,server);
        });
    } else {
        return getAllServers();
    }
}

function getAllServers() {
    return _.filter(fs.readdirSync("."), function (f) {
        return fs.existsSync(f + "/servers.json");
    });
}

function getServersConfig(server) {
    return JSON.parse(JSON.minify(fs.readFileSync(server + "/servers.json", "utf8")));
}

function extractVersions(config) {
    if (opts.options.version) {
        return _.filter(config.versions, function (version) {
            return _.contains(opts.options.version,version);
        });
    } else {
        return config.versions;
    }
}