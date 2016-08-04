FROM jboss/wildfly:9.0.1.Final

MAINTAINER deppisch@consol.de

# User root user to install software
USER root

ADD deploy-and-run.sh /opt/jboss/wildfly/bin/
RUN chmod a+x /opt/jboss/wildfly/bin/deploy-and-run.sh

# Switch back to jboss user
USER jboss

CMD /opt/jboss/wildfly/bin/deploy-and-run.sh
