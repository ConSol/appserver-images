{{
  var base = it.config.base;
  var majorVersion = it.version.replace(/^([^.]+).*$/,"$1");
  var url = it.config.url ||
           "http://archive.apache.org/dist/tomcat/tomcat-" + majorVersion +
           "/v${TOMCAT_VERSION}/bin/" + base + "-${TOMCAT_VERSION}.tar.gz";
  var toRemove = it.config.toRemove;
  var roleFile = it.config.roleFile;
  var jolokiaVersion = it.config.jolokiaVersion;
}}
FROM {{= it.javaJolokiaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8080 8778

ENV TOMCAT_VERSION {{= it.config.version }}
ENV DEPLOY_DIR /maven
{{? it.config.useJavaHome}}
ENV JAVA_HOME {{= it.javaHome }}
{{?}}

# Get and Unpack Tomcat
RUN wget {{= url }} -O /tmp/catalina.tar.gz && tar xzf /tmp/catalina.tar.gz -C /opt && ln -s /opt/{{= base }}-${TOMCAT_VERSION} /opt/tomcat && rm /tmp/catalina.tar.gz

# Add roles
ADD {{= roleFile.file}} /opt/{{= base}}-${TOMCAT_VERSION}/conf/{{= roleFile.dir}}

# Jolokia config
ADD jolokia.properties /opt/jolokia/jolokia.properties

# Startup script
ADD deploy-and-run.sh /opt/{{= base}}-${TOMCAT_VERSION}/bin/

# Remove unneeded apps
RUN rm -rf {{~toRemove :value:index}}/opt/tomcat/webapps/{{=value}} {{~}}

VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root" ]

ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh

