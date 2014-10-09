{{
  var base = it.config.base;
  var majorVersion = it.version.replace(/^([^.]+).*$/,"$1");
  var url = it.config.url ||
           "http://archive.apache.org/dist/tomcat/tomcat-" + majorVersion +
           "/v${KARAF_VERSION}/bin/" + base + "-${KARAF_VERSION}.tar.gz";
  var toRemove = it.config.toRemove;
  var roleFile = it.config.roleFile;
}}
FROM {{= it.javaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8181 8101 8778

ENV KARAF_VERSION {{= it.config.version }}
ENV DEPLOY_DIR /maven
{{? it.config.useJavaHome}}
ENV JAVA_HOME {{= it.javaHome }}
{{?}}

RUN wget {{= url }} -O /tmp/karaf.tar.gz

# Unpack
RUN tar xzf /tmp/karaf.tar.gz -C /opt
RUN ln -s /opt/{{= base }}-${KARAF_VERSION} /opt/karaf
RUN rm /tmp/karaf.tar.gz

# Add roles
ADD {{= roleFile.file}} /opt/{{= base}}-${KARAF_VERSION}/{{= roleFile.dir}}

# Startup script
ADD deploy-and-run.sh /opt/{{= base}}-${KARAF_VERSION}/bin/
RUN chmod +x /opt/{{= base}}-${KARAF_VERSION}/bin/deploy-and-run.sh

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/karaf/jolokia-agent.jar

# Remove unneeded apps
RUN rm -rf {{~toRemove :value:index}}/opt/karaf/deploy/{{=value}} {{~}}

# VOLUME ["/opt/karaf/data", "/tmp/hsperfdata_root"

ENV KARAF_OPTS -javaagent:/opt/karaf/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV KARAF_HOME /opt/karaf
ENV PATH $PATH:$KARAF_HOME/bin

CMD /opt/karaf/bin/deploy-and-run.sh
