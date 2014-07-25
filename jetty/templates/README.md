## Jetty {{= it.version}}

A simple docker build for installing a vanilla Jetty {{= it.version}} below
*/opt/jetty*. It comes out of the box and is intended for use in 
integration tests

During startup a directory specified by the environment variable `DEPLOY_DIR` 
(/maven by default) is checked for .war files. If there 
are any, they are linked into Jetty's webapps/ directory for automatic
deployment. This plays nicely with the Docker maven plugin from 
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exported from a directory "/maven".

Features:

* Jetty Version: **{{= it.config.version}}**
* Java Version: **{{= it.javaVersion}}** (base image: *{{= it.javaBaseImage}}*)
* Port: **8080**
* Command: `/opt/tomcat/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/jetty/webapps* and then calls `/opt/jetty/bin/jetty.sh run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
  