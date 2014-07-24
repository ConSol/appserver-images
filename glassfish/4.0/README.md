## Apache Tomcat {{= it.version}}

A simple docker build for installing a vanilla Glassfish 4.0 below
*/opt/glassfish*. It comes out of the box and is intended for use for
integration testing.

During startup a directory /maven is checked for .war files. If there 
are any, they are deployed to glassfish. This plays nicely with the Docker maven plugin from 
https://github.com/rhuss/docker-maven-plugin/ and its 'assembly' mode which
can automatically create Docker data container with Maven artifacts
exported from a directory "/maven".

Features:

* Glassfish Version: **4.0**
* Port: **8080**  