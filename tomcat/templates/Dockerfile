{{
  var base = it.config.base;
  var majorVersion = it.version.replace(/^([^.]+).*$/,"$1");
  var url = it.config.url ||
           "http://archive.apache.org/dist/tomcat/tomcat-" + majorVersion +
           "/v${TOMCAT_VERSION}/bin/" + base + "-${TOMCAT_VERSION}.tar.gz";
  var toRemove = it.config.toRemove;
  var roleFile = it.config.roleFile;
}}
FROM {{= it.javaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8080

ENV TOMCAT_VERSION {{= it.config.version }}
ENV DEPLOY_DIR /maven
{{? it.config.useJavaHome}}
ENV JAVA_HOME {{= it.javaHome }}
{{?}}

RUN wget {{= url }} -O /tmp/catalina.tar.gz

# Unpack
RUN tar xzf /tmp/catalina.tar.gz -C /opt
RUN ln -s /opt/{{= base }}-${TOMCAT_VERSION} /opt/tomcat
RUN rm /tmp/catalina.tar.gz

# Add roles
ADD {{= roleFile.file}} /opt/{{= base}}-${TOMCAT_VERSION}/conf/{{= roleFile.dir}}

# Startup script
ADD deploy-and-run.sh /opt/{{= base}}-${TOMCAT_VERSION}/bin/

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/tomcat/jolokia-agent.jar

# Remove unneeded apps
RUN rm -rf {{~toRemove :value:index}}/opt/tomcat/webapps/{{=value}} {{~}}

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV CATALINA_OPTS -javaagent:/opt/tomcat/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh

