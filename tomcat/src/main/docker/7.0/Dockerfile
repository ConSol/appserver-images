FROM jolokia/java-jolokia:7

MAINTAINER roland@jolokia.org

EXPOSE 8080 8778

ENV TOMCAT_VERSION 7.0.62
ENV DEPLOY_DIR /maven
ENV CATALINA_HOME=/opt/tomcat

# Get and Unpack Tomcat
RUN wget http://archive.apache.org/dist/tomcat/tomcat-7/v${TOMCAT_VERSION}/bin/apache-tomcat-${TOMCAT_VERSION}.tar.gz -O /tmp/catalina.tar.gz \
    && tar xzf /tmp/catalina.tar.gz -C /opt && mv /opt/apache-tomcat-${TOMCAT_VERSION} ${CATALINA_HOME} && rm /tmp/catalina.tar.gz

# Add roles
ADD tomcat-users.xml ${CATALINA_HOME}/conf/

# Jolokia config
ADD jolokia.properties /opt/jolokia/jolokia.properties

# Startup script
ADD deploy-and-run.sh ${CATALINA_HOME}/bin/

# Remove unneeded apps
RUN rm -rf ${CATALINA_HOME}/webapps/examples ${CATALINA_HOME}/webapps/docs

RUN rm -rf ${CATALINA_HOME}/logs ${CATALINA_HOME}/work ${CATALINA_HOME}/temp
#VOLUME ["${CATALINA_HOME}/logs", "${CATALINA_HOME}/work", "${CATALINA_HOME}/temp", "/tmp/hsperfdata_root" ]

ENV PATH $PATH:$CATALINA_HOME/bin

ENV INST_SCRIPTS /install
ADD ./install/ $INST_SCRIPTS
RUN find $INST_SCRIPTS -exec chmod a+x {} + \
    && $INST_SCRIPTS/set_user_permission.sh ${CATALINA_HOME}

CMD /opt/tomcat/bin/deploy-and-run.sh
