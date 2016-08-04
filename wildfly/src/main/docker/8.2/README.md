## JBoss Wildfly 8.2.1.Final

A simple docker build for installing a vanilla JBoss Wildfly 8.2.1.Final below
*/opt/jboss/wildfly*. It comes out of the box and is intended for use for
integration testing.

During startup a directory specified by the environment variable `DEPLOY_DIR`
(*/maven* by default) is checked for .war files. If there
are any, they are linked into the *deployments/* directory for automatic
deployment. This plays nicely with the Docker maven plugin from
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exposed from a directory */maven*

Features:

* Wildfly Version: **8.2.1.Final**
* Java Version: **JDK 1.7** (base image: *jboss/base-jdk:7*)
* Port: **8080**
* Command: `/opt/jboss/wildfly/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/jboss/wildfly/standalone/deployments/* and then calls `standalone.sh` binary