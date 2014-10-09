## Jetty 4

A simple docker build for installing a vanilla Jetty 4 below
*/opt/jetty*. It comes out of the box and is intended for use in 
integration tests


During startup a directory specified by the environment variable `DEPLOY_DIR`
(*/maven* by default) is checked for .war files. If there
are any, they are linked into Jetty's *webapps/* directory for automatic
deployment. This plays nicely with the Docker maven plugin from
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exposed from a directory */maven*



This image will enable a Jolokia agent during startup which can be reached
by default within the container at port 8778.

The environment variable `$JOLOKIA_DISABLE` can be set to any value so that
agent won't be started.

More information about can be found in the description of [{{= it.javaJolokiaBaseImage}}](https://registry.hub.docker.com/u/{{= it.javaJolokiaBaseImage}})


Features:

* Jetty Version: **4.2.27**
* Java Version: **OpenJDK 1.7.0_60 (7u60-2.5.0-2)** (base image: *java:7u60*)
* Port: **8080**
* Command: `/opt/jetty/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/jetty/webapps* and then calls `/opt/jetty/bin/jetty.sh run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
