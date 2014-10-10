## Jetty {{= it.version}}

A simple docker build for installing a vanilla Jetty {{= it.version}} below
*/opt/jetty*. It comes out of the box and is intended for use in 
integration tests

{{= it.fragments.readmeDeploymentInstruction }}

{{= it.fragments.readmeJolokiaBaseImage }}

Features:

* Jetty Version: **{{= it.config.version}}**
* Java Version: **{{= it.javaVersion}}** (base image: *{{= it.javaJolokiaBaseImage}}*)
* Port: **8080**
* Command: `/opt/jetty/bin/deploy-and-run.sh` which links .war files from */maven* to 
  */opt/jetty/webapps* and then calls `/opt/jetty/bin/jetty.sh run`
* Sets `-Djava.security.egd=file:/dev/./urandom` for faster startup times
  (though a bit less secure)
  