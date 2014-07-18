#!/usr/local/bin/node

var dot = require('dot');
dot.templateSettings.strip = false;

var fs = require('fs');
require('colors');
var _ = require('underscore');
var Docker = require('dockerode');
var tarCmd = "tar";
var child = require('child_process');
var stream = require('stream');

JSON.minify = JSON.minify || require("node-json-minify");

(function() {
    var opts = parseOpts();

    // All supported servers which must be present as a sub-directory
    var servers = getServers(opts);

    // Create build files
    createAutomatedBuilds(servers, opts);

    // If desired create Docker images
    if (opts.options.build) {
        buildImages(servers, opts);
    }
})();

// ===============================================================================

function createAutomatedBuilds(servers, opts) {
    console.log("Creating Automated Builds\n".cyan);

    var globalConfig = {};
    if (fs.existsSync("config.json")) {
        globalConfig = JSON.parse(JSON.minify(fs.readFileSync("config.json", "utf8")));
    }
    servers.forEach(function (server) {
        console.log(server.magenta);
        var config =
            _.extend({},
                globalConfig,
                getServersConfig(server));
        var versions = extractVersions(config,opts.options.version);
        execWithTemplates(server, function (templates) {
            versions.forEach(function (version) {
                console.log("    " + version.green);
                ensureDir(__dirname + "/" + server + "/" + version);
                var changed = false;
                templates.forEach(function (template) {
                    var file = checkForMapping(config, version, template.file);
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
                                { "version":  version,
                                    "config": _.extend({}, config.meta['default'], config.meta[version])}
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
}

function buildImages(servers,opts) {
    console.log("\n\nBuilding Images\n".cyan);

    var docker = new Docker(getDockerConnectionsParams(opts));

    servers.forEach(function(server) {
        console.log(server.magenta);
        var versions = extractVersions(getServersConfig(server),opts.options.version);
        doBuildImages(docker,server,versions);
    });
}

// ===================================================================================

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
    var templates = fs.readdirSync(templ_dir);
    var ret = [];
    templates.forEach(function (template) {
        ret.push({
            "templ" : dot.template(fs.readFileSync(templ_dir + "/" + template)),
            "file" : template
        });
    });
    templFunc(ret);
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
    return _.filter(fs.readdirSync(__dirname), function (f) {
        return fs.existsSync(f + "/servers.json");
    });
}

function getServersConfig(server) {
    return JSON.parse(JSON.minify(fs.readFileSync(__dirname + "/" + server + "/servers.json", "utf8")));
}

function extractVersions(config,versionsFromOpts) {
    if (versionsFromOpts) {
        return _.filter(config.versions, function (version) {
            return _.contains(versionsFromOpts,version);
        });
    } else {
        return config.versions;
    }
}

function getFullVersion(server,version) {
    var config = getServersConfig(server);
    return config.meta[version].version;
}

function doBuildImages(docker,server,versions) {
    if (versions.length > 0) {
        var version = versions.shift();
        console.log("    " + version.green);
        var tar = child.spawn(tarCmd, ['-c', '.'], { cwd: __dirname + "/" + server + "/" + version });
        var name = "consol/" + server + "-" + version;
        var fullName = name + ":" + getFullVersion(server,version);
        docker.buildImage(
            tar.stdout, { "t": fullName, "forcerm": true, "q": true },
            function (error, stream) {
                if (error) {
                    throw error;
                }
                stream.pipe(getResponseStream());
                stream.on('end', function () {
                    docker.getImage(fullName).tag({repo: name }, function (error, result) {
                        if (error) { throw error; }
                        console.log(result);
                    });
                    doBuildImages(docker,server,versions);
                });
            });
    }
}

function getResponseStream() {
    var buildResponseStream = new stream.Writable();
    buildResponseStream._write = function (chunk, encoding, done) {
        var resp = JSON.parse(chunk.toString());
        if (resp.stream) {
            process.stdout.write(resp.stream);
        }
        if (resp.errorDetail) {
            process.stderr.write(resp.stream);
        }
        done();
    };
    return buildResponseStream;
}

function getDockerConnectionsParams(opts) {
    if (opts.options.host) {
        return {
            "host": "http://" + opts.options.host,
            "port": opts.options.port || 2375
        };
    } else if (process.env.DOCKER_HOST) {
        var parts = process.env.DOCKER_HOST.match(/^tcp:\/\/(.+?)\:?(\d+)?$/i);
        if (parts !== null) {
            return {
                "host" : "http://" + parts[1],
                "port" : parts[2] || 2375
            };
        } else {
            return {
                "socketPath" : process.env.DOCKER_HOST
            };
        }
    } else {
        return {
            "host" : "http://localhost",
            "port" : 2375
        };
    }
}

function parseOpts() {
    var Getopt = require('node-getopt');
    var getopt = new Getopt([
        ['s' , 'server=ARG+', 'Servers for which to create container images (e.g. "tomcat")'],
        ['v' , 'version=ARG+', 'Versions of a given server to create (e.g. "7.0" for tomcat)'],
        ['b' , 'build', 'Build image(s)'],
        ['d' , 'host', 'Docker hostname (default: localhost)'],
        ['p' , 'port', 'Docker port (default: 2375)'],
        ['h' , 'help', 'display this help']
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


