# Docker Appserver Images

This project holds Docker builds for various Java application servers with various versions. 
These images are all setup to work nicely with the [docker-maven-plugin](https://github.com/rhuss/docker-maven-plugin).
I.e. all `*.war` or `*.ear` artifacts found in `/maven` (which can be linked in externally) get automatically deployed
during startup.

The project also uses the docker-maven-plugin internally to build the images. You can build the images locally on the
Dockerhost with

````
mvn clean package docker:build
````

By default the environment variable `DOCKER_HOST` is evaluated for connecting to the Docker deamon on your host. Use the
docker-maven-plugin configuration settings for other connection parameters to the Docker daemon.

You can restrict the images to build by selecting the maven sub modules

````
mvn -pl jetty clean package docker:build
````
 
## Servers

Currently we have the following servers

* Jetty: 4, 5, 6, 7, 8, 9
* Apache Tomcat: 3.3, 4.1, 5.0, 5.5, 6.0, 7.0, 8.0
* Apache Karaf: 2.4, 3.0
* JBoss Wildfly: 8.2, 9.0, 10.0

All server images are pushed to [hub.docker.io](https://registry.hub.docker.com/repos/consol/) and can be faved there ;-)