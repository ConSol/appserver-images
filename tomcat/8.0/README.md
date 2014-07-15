## Apache Tomcat 8.0

A simple docker build for installing a vanilla Tomcat 8.0 below
*/opt/tomcat*. It comes out of the box and is intended for use for
integration testing.

During startup a directory /maven is checked for .war files. If there 
are any, they are linked into Tomcat's webapp/ directory for automatic
deployment. This plays nicely with the Docker maven plugin from 
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically can create Docker data container with Maven artefacts
exported from a directory "/maven".

Features:

* Tomcat Version: **8.0.8**
* Java Version: **Oracle 1.7.0_51-b13** (base image: *dockerfile/java*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the admin
  applications */host-manager* and */manager*)
* Documentation and examples have been removed
* Command: `/opt/tomcat/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/tomcat/webapps* and then calls `catalina.sh run`
* /dev/urandom is used instead of /dev/random for faster startup times
  (though a bit less secure)
