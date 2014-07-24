FROM dockerfile/java

MAINTAINER roland@jolokia.org

EXPOSE 8080

ENV GLASSFISH_VERSION 4
ENV DEPLOY_DIR /maven
ENV http_proxy http://10.250.0.180:8001

RUN wget http://download.java.net/glassfish/4.0/release/glassfish-${GLASSFISH_VERSION}.0.zip -O /tmp/glassfish.zip

# Unpack
RUN unzip /tmp/glassfish.zip -d /opt
RUN ln -s /opt/glassfish${GLASSFISH_VERSION} /opt/glassfish
RUN rm /tmp/glassfish.zip

# Add roles
# ADD tomcat-users.xml /opt/apache-tomcat-${TOMCAT_VERSION}/conf/

# Startup script
ADD deploy-and-run.sh /opt/glassfish${GLASSFISH_VERSION}/bin/

# Remove unneeded apps
# RUN rm -rf /opt/tomcat/webapps/examples /opt/tomcat/webapps/docs 

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV GLASSFISH_HOME /opt/glassfish
ENV PATH $PATH:${GLASSFISH_HOME}/bin
RUN echo  $PATH

CMD /opt/glassfish/bin/deploy-and-run.sh
