## Glassfish v3

A simple docker build for installing a vanilla Glassfish V3 below
*/opt/glassfish*. It comes out of the box and is intended for use for
integration testing.


During startup a directory specified by the environment variable `DEPLOY_DIR`
(*/maven* by default) is checked for .war files. If there
are any, they are linked into the *webapps/* directory for automatic
deployment. This plays nicely with the Docker maven plugin from
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exposed from a directory */maven*

Features:

* Glassfish Version: **v3**
* Java Version: **JDK 1.7.0_79 (7u79-2.5.5-1~deb8u)** (base image: *java:7-jdk*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the admin
  applications */host-manager* and */manager*)
* Documentation and examples have been removed
* Command: `/opt/glassfish/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/glassfish/webapps* and then calls `asadmin start-domain` binary