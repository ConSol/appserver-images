## Jetty 9

A simple docker build for installing a vanilla Jetty 9 below
*/opt/jetty*. It comes out of the box and is intended for use in 
integration tests


During startup a directory specified by the environment variable `DEPLOY_DIR`
(*/maven* by default) is checked for .war files. If there
are any, they are linked into the *webapps/* directory for automatic
deployment. This plays nicely with the Docker maven plugin from
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exposed from a directory */maven*



This image will enable a Jolokia agent during startup which can be reached
by default within the container at port 8778.

The environment variable `$JOLOKIA_OFF` can be set so that the agent won't start.

More information about Jolokia configuration options can be found at
[jolokia/java-jolokia](https://registry.hub.docker.com/u/jolokia/java-jolokia)


Features:

* Jetty Version: **9.2.11.v20150529**
* Java Version: **OpenJDK 1.7.0_79 (7u79-2.5.5-1~deb8u)** (base image: *jolokia/java-jolokia:7*)
* Port: **8080**
* Command: `/opt/jetty/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/jetty/webapps* and then calls `/opt/jetty/bin/jetty.sh run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
