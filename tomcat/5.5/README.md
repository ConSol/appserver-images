## Apache Tomcat 5.5

A simple docker build for installing a vanilla Tomcat 5.5 below
*/opt/tomcat*. It comes out of the box and is intended for use for
integration testing. A Jolokia agent is installed too and can be customized 
with the environment variables described for image consol/java-jolokia

During startup a directory specified by the environment variable `DEPLOY_DIR`
(*/maven* by default) is checked for .war files. If there
are any, they are linked into Jetty's *webapps/* directory for automatic
deployment. This plays nicely with the Docker maven plugin from
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exposed from a directory */maven*


Features:

* Tomcat Version: **5.5.36**
* Java Version: **OpenJDK 1.7.0_60 (7u60-2.5.0-2)** (base image: *consol/java-jolokia*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the admin
  applications */host-manager* and */manager*)
* Documentation and examples have been removed
* Command: `/opt/tomcat/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/tomcat/webapps* and then calls `catalina.sh run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
