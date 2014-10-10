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

### A generic pattern to use inject Jolokia agent in JVM based Docker containers without altering them.

Using Jolokia JVM agent capability to attach to an already running jav process, we can use that strategy to inject the agent in pre-existing Docker image without the need to alter them:

**Example** using https://github.com/jboss/dockerfiles/blob/master/wildfly/Dockerfile
```bash
docker run \
  -v /data/installers/jolokia-jvm-1.2.2-agent.jar:/opt/jolokia/jolokia-jvm-1.2.2-agent.jar \
  -it jboss/wildfly  \
  sh -c 'exec /opt/wildfly/bin/standalone.sh  -b 0.0.0.0 -bmanagement 0.0.0.0 &  \
  while ! curl -m 10 http://localhost:8080 ; do echo still down ; sleep 1s ; done ; \
  java -jar /opt/jolokia/jolokia-jvm-1.2.2-agent.jar --host 0.0.0.0 ".*jboss-modules.*"; \
  sh'
```
Where:
- `/data/installers/jolokia-jvm-1.2.2-agent.jar` is a path on your host
- `while ! curl -m 10 http://localhost:8080 ; do echo still down ; sleep 1s ; done ;` is needed due to peculiar behavior of Wildfly, classloading and agents. Basically we are just waiting for Wildfly to be up and running.
- `".*jboss-modules.*"` is a regexp to identify a unique process in the output of `ps ax`
- instead of using `-v` to inject a host file inside the container you could consider a more portable approach with **Docker data only containers**. See http://www.tech-d.net/2013/12/16/persistent-volumes-with-docker-container-as-volume-pattern/
