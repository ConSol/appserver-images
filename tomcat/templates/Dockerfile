{{
  var meta = it.meta[it.version];
  var base = meta.base || "apache-tomcat";
  var majorVersion = it.version.replace(/^([^.]+).*$/,"$1");
  var url = meta.url ||
           "http://archive.apache.org/dist/tomcat/tomcat-" + majorVersion +
           "/v${TOMCAT_VERSION}/bin/" + base + "-${TOMCAT_VERSION}.tar.gz";
  var toRemove = meta.toRemove || [ "examples", "docs" ];
  var roleFile = meta.roleFile || { "file" : "tomcat-users.xml", "dir" : "" };
}}
FROM {{= it.javaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8080

ENV TOMCAT_VERSION {{= meta.version }}
ENV DEPLOY_DIR /maven
{{? meta.useJavaHome}}
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

# Remove unneeded apps
RUN rm -rf {{~toRemove :value:index}}/opt/tomcat/webapps/{{=value}} {{~}}

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh
