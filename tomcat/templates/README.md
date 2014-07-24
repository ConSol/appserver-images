## Apache Tomcat {{= it.version}}

A simple docker build for installing a vanilla Tomcat {{= it.version}} below
*/opt/tomcat*. It comes out of the box and is intended for use for
integration testing.

During startup a directory /maven is checked for .war files. If there 
are any, they are linked into Tomcat's webapp/ directory for automatic
deployment. This plays nicely with the Docker maven plugin from 
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create a Docker data container with Maven artifacts
exported from the directory "/maven".

Features:

* Tomcat Version: **{{= it.config.version}}**
* Java Version: **{{= it.javaVersion}}** (base image: *{{= it.javaBaseImage}}*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the admin
  applications */host-manager* and */manager*)
* Documentation and examples have been removed
* Command: `/opt/tomcat/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/tomcat/webapps* and then calls `{{= it.config.runCmd}} run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
  