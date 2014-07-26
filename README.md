# Docker Appserver Images

This project holds Docker builds for various Java application servers with various versions. 
These images are all setup to work nicely with the [docker-maven-plugin](https://github.com/rhuss/docker-maven-plugin).
I.e. all `*.war` or `*.ear` artifacts found in `/maven` (which can be linked in externally) get automatically deployed
during startup.

A node.js application `docker-appserver.js` is included for regenerating Dockerfiles and helper scripts from templates (in 
order to avoid duplication for various, similar versions).

Also, with the option `--build` all images can be build locally on the Dockerhost. Use the other command line options
for either restricting to a certain server/version or to specify the connection parameters to the Docker daemon 
(by default the environment variable `DOCKER_HOST` is evaluated)
 
## Servers

Currently the following servers with 

* Apache Tomcat: 3.3, 4.1, 5.0, 5.5, 6.0, 7.0, 8.0

All server images are pushed to [hub.docker.io](https://registry.hub.docker.com/repos/consol/) and can be faved there ;-)

## docker-appserver.js

````
Usage: node docker-appserver.js [OPTION]
Generator for automated Docker builds.

  -s, --server=ARG+   Servers for which to create container images (e.g. "tomcat")
  -v, --version=ARG+  Versions of a given server to create (e.g. "7.0" for tomcat)
  -b, --build         Build image(s)
  -d, --host          Docker hostname (default: localhost)
  -p, --port          Docker port (default: 2375)
  -h, --help          display this help

This script creates so called 'automated builds' for Java application server
which can be registered at hub.docker.io

It uses templates for covering multiple version of appserver.

Supported servers:

   jetty: 4, 5, 6, 7, 8, 9
   tomcat: 3, 4, 5, 5.5, 6, 7, 8
````