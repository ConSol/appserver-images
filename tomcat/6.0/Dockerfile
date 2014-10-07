FROM java

MAINTAINER roland@jolokia.org

EXPOSE 8080

ENV TOMCAT_VERSION 6.0.41
ENV DEPLOY_DIR /maven


RUN wget http://archive.apache.org/dist/tomcat/tomcat-6/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz -O /tmp/catalina.tar.gz

# Unpack
RUN tar xzf /tmp/catalina.tar.gz -C /opt
RUN ln -s /opt/apache-tomcat-${TOMCAT_VERSION} /opt/tomcat
RUN rm /tmp/catalina.tar.gz

# Add roles
ADD tomcat-users.xml /opt/apache-tomcat-${TOMCAT_VERSION}/conf/

# Startup script
ADD deploy-and-run.sh /opt/apache-tomcat-${TOMCAT_VERSION}/bin/

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/tomcat/jolokia-agent.jar

# Remove unneeded apps
RUN rm -rf /opt/tomcat/webapps/examples /opt/tomcat/webapps/docs 

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV CATALINA_OPTS -javaagent:/opt/tomcat/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh
