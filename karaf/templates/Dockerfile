{{
  var base = it.config.base;
  var majorVersion = it.version.replace(/^([^.]+).*$/,"$1");
  var url = it.config.url ||
           "http://archive.apache.org/dist/tomcat/tomcat-" + majorVersion +
           "/v${KARAF_VERSION}/bin/" + base + "-${KARAF_VERSION}.tar.gz";
  var toRemove = it.config.toRemove;
  var roleFile = it.config.roleFile;
}}
FROM {{= it.javaJolokiaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8181 8101 8778

ENV KARAF_VERSION {{= it.config.version }}
{{? it.config.useJavaHome}}
ENV JAVA_HOME {{= it.javaHome }}
{{?}}

RUN wget {{= url }} -O /tmp/karaf.tar.gz && \
    tar xzf /tmp/karaf.tar.gz -C /opt/ && \
    ln -s /opt/{{= base }}-${KARAF_VERSION} /opt/karaf && \
    rm /tmp/karaf.tar.gz

# Add roles
ADD {{= roleFile.file}} /opt/{{= base}}-${KARAF_VERSION}/{{= roleFile.dir}}

# Jolokia config
ADD jolokia.properties /opt/jolokia/jolokia.properties

# Startup script
ADD deploy-and-run.sh /opt/karaf/bin/ 

RUN chmod a+x /opt/karaf/bin/deploy-and-run.sh && \
    rm -rf {{~toRemove :value:index}}/opt/karaf/deploy/{{=value}} {{~}} && \
    perl -p -i -e 's/^(log4j.rootLogger.*?,\s*)out(.*)/${1}stdout${2}/' /opt/karaf/etc/org.ops4j.pax.logging.cfg

ENV PATH $PATH:/opt/karaf/bin

CMD /opt/karaf/bin/deploy-and-run.sh
