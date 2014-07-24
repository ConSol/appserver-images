FROM dockerfile/java

MAINTAINER zb@consol.de olafr@consol.de

EXPOSE 8080

ENV WILDFLY_VERSION 8.1.0.Final
ENV DEPLOY_DIR /maven

RUN wget http://download.jboss.org/wildfly/${WILDFLY_VERSION}/wildfly-${WILDFLY_VERSION}.tar.gz -O /tmp/wildfly.tar.gz

# Unpack
RUN tar xzf /tmp/wildfly.tar.gz -C /opt
RUN ln -s /opt/wildfly-${WILDFLY_VERSION} /opt/wildfly
RUN rm /tmp/wildfly.tar.gz

# Add roles
ADD mgmt-groups.properties /opt/wildfly-${WILDFLY_VERSION}/standalone/configuration/
ADD mgmt-users.properties /opt/wildfly-${WILDFLY_VERSION}/standalone/configuration/

# Startup script
ADD deploy-and-run.sh /opt/wildfly-${WILDFLY_VERSION}/bin/

ENV WILDFLY_HOME /opt/wildfly
ENV PATH $PATH:$WILDFLY_HOME/bin

CMD /opt/wildfly-${WILDFLY_VERSION}/bin/deploy-and-run.sh
