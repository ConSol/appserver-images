FROM dockerfile/java

MAINTAINER roland@jolokia.org

EXPOSE 8080

ENV TOMCAT_VERSION 4.1.40
ENV JAVA_HOME /usr/lib/jvm/java-7-oracle

RUN wget http://archive.apache.org/dist/tomcat/tomcat-4/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz -O /tmp/catalina.tar.gz

# Unpack
RUN tar xzf /tmp/catalina.tar.gz -C /opt
RUN ln -s /opt/apache-tomcat-${TOMCAT_VERSION} /opt/tomcat
RUN rm /tmp/catalina.tar.gz

# Add roles
ADD tomcat-users.xml /opt/apache-tomcat-${TOMCAT_VERSION}/conf/

# Add startup script
ADD deploy-and-run.sh /opt/apache-tomcat-${TOMCAT_VERSION}/bin/

# Remove unneeded apps
RUN rm -rf /opt/tomcat/webapps/jsp-examples  /opt/tomcat/webapps/servlets-examples  /opt/tomcat/webapps/tomcat-docs/  /opt/tomcat/webapps/webdav/

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV CATALINA_HOME /opt/tomcat
ENV PATH $PATH:$CATALINA_HOME/bin

CMD /opt/tomcat/bin/deploy-and-run.sh
