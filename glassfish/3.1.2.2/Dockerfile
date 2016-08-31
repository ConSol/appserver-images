FROM dockerfile/java

MAINTAINER martin.maher@consol.de

EXPOSE 8080
EXPOSE 8081
EXPOSE 4848
EXPOSE 8686

ENV GLASSFISH_VERSION 3.1.2.2
ENV DEPLOY_DIR /maven

RUN wget http://dlc.sun.com.edgesuite.net/glassfish/${GLASSFISH_VERSION}/release/glassfish-${GLASSFISH_VERSION}.zip -O /tmp/glassfish.zip

# Unpack
RUN unzip /tmp/glassfish.zip -d /opt
RUN ln -s /opt/glassfish3 /opt/glassfish
RUN rm /tmp/glassfish.zip

# Startup script
ADD deploy-and-run.sh /opt/glassfish/bin/

# Copy over custom domain.xml
# todo set custom java.security.egd property

# VOLUME ["/opt/tomcat/logs", "/opt/tomcat/work", "/opt/tomcat/temp", "/tmp/hsperfdata_root"

ENV GLASSFISH_HOME /opt/glassfish
ENV PATH $PATH:$GLASSFISH_HOME/bin

CMD /opt/glassfish/bin/deploy-and-run.sh
