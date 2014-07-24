## JBoss Wildfly 8.1.0-Final

A simple docker build for installing a vanilla Wildfly 8.1 below
*/opt/wildfly*. It comes out of the box and is intended for use for
integration testing.

During startup a directory /maven is checked for .war files. If there 
are any, they are linked into Wildfly's standalone/deployments/ directory for automatic
deployment. This plays nicely with the Docker maven plugin from 
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically can create Docker data container with Maven artefacts
exported from a directory "/maven".

Features:

* Wildfly Version: **8.1.0-Final**
* Java Version: **Oracle 1.7.0_51-b13** (base image: *dockerfile/java*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the Wildfly admin console
* Command: `/opt/wildfly/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/wildfly/standalone/deployments* and then calls `standalone.sh`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
