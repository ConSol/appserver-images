## Apache Karaf {{= it.version}}

A simple docker build for installing a vanilla Karaf {{= it.version}} below
*/opt/karaf*. It comes out of the box and is intended for use for
integration testing.

{{= it.fragments.readmeDeploymentInstruction }}

Features:

* Karaf Version: **{{= it.config.version}}**
* Java Version: **{{= it.javaVersion}}** (base image: *{{= it.javaBaseImage}}*)
* Port: **8080**
* User **admin** (Password: **admin**) has been added to access the admin
  applications */host-manager* and */manager*)
* Documentation and examples have been removed
* Command: `/opt/tomcat/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/tomcat/webapps* and then calls `{{= it.config.runCmd}} run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
  
