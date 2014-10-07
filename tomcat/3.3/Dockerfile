FROM java

MAINTAINER roland@jolokia.org

EXPOSE 8080 8778

ENV TOMCAT_VERSION 3.3.2
ENV DEPLOY_DIR /maven

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64


RUN wget http://archive.apache.org/dist/tomcat/tomcat-3/v${TOMCAT_VERSION}/bin/jakarta-tomcat-${TOMCAT_VERSION}.tar.gz -O /tmp/catalina.tar.gz

# Unpack
RUN tar xzf /tmp/catalina.tar.gz -C /opt
RUN ln -s /opt/jakarta-tomcat-${TOMCAT_VERSION} /opt/tomcat
RUN rm /tmp/catalina.tar.gz

# Add roles
ADD admin-users.xml /opt/jakarta-tomcat-${TOMCAT_VERSION}/conf/users/

# Startup script
ADD deploy-and-run.sh /opt/jakarta-tomcat-${TOMCAT_VERSION}/bin/

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/tomcat/jolokia-agent.jar

# Remove unneeded apps
RUN rm -rf /opt/tomcat/webapps/examples.war 

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV CATALINA_OPTS -javaagent:/opt/tomcat/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh
