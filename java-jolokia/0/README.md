## Java Jolokia

This image is based on the official Java image and includes a Jolokia JVM agent. 
The agent is installed as `/opt/jolokia/jolokia.jar`. 

In order to enable Jolokia for your application you should use this 
image as a base image (via `FROM`) and source `/opt/jolokia/jolokia_env.sh` in 
your startup scripts. This will set an environment variable `$JOLOKIA_OPTS` with 
the appropriate startup options. 

For example, the following snippet can be added to a script starting up your 
Java application

    # ...
    . /opt/jolokia/jolokia_env.sh
    export JAVA_OPTIONS="$JAVA_OPTIONS $JOLOKIA_OPTS"
    # .... us JAVA_OPTIONS when starting your app, e.g. as Tomcat does

You can influence the behaviour `jolokia_env.sh` by setting various environment 
variables:

* **`JOLOKIA_DISABLE`** : If set (with any value) disables activation of Jolokia (i.e. sets `$JOLOKIA_OPTTIONS` to an empty value). By default, Jolokia is enabled. 
* **`JOLOKIA_CONFIG`** : If set uses this file (including path) as Jolokia JVM agent properties (as described in Jolokia's reference manual). By default this is `/opt/jolokia/jolokia.properties`. If this file exists, it will taken as configuration, if not it is ignored.  
* **`JOLOKIA_HOST`** : Jolokia host to use
* **`JOLOKIA_PORT`** : Port to use (Default: 8778)
* **`JOLOKIA_USER`** : User to use for authentication. By default authentication is switched off.
* **`JOLOKIA_PASSWORD`** : Password to use for authentication. By default authentication is switched off.

The following versions are used:

* Java Version: **OpenJDK 1.7.0_60 (7u60-2.5.0-2)** (base image: *java*)
* Jolokia Version: **1.2.2** 
* Jolokia Port: **8778**
