FROM jolokia/java-jolokia:7

MAINTAINER roland@jolokia.org

EXPOSE 8080 8778

ENV TOMCAT_VERSION 3.3.2
ENV DEPLOY_DIR /maven

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64


# Get and Unpack Tomcat
RUN wget http://archive.apache.org/dist/tomcat/tomcat-3/v${TOMCAT_VERSION}/bin/jakarta-tomcat-${TOMCAT_VERSION}.tar.gz -O /tmp/catalina.tar.gz && tar xzf /tmp/catalina.tar.gz -C /opt && ln -s /opt/jakarta-tomcat-${TOMCAT_VERSION} /opt/tomcat && rm /tmp/catalina.tar.gz

# Add roles
ADD admin-users.xml /opt/jakarta-tomcat-${TOMCAT_VERSION}/conf/users/

# Jolokia config
ADD jolokia.properties /opt/jolokia/jolokia.properties

# Startup script
ADD deploy-and-run.sh /opt/jakarta-tomcat-${TOMCAT_VERSION}/bin/

# Remove unneeded apps
RUN rm -rf /opt/tomcat/webapps/examples.war 

VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root" ]

ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh
