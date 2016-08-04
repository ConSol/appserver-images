FROM jboss/wildfly:10.0.0.Final

MAINTAINER deppisch@consol.de

# User root user to install software
USER root

ADD deploy-and-run.sh /opt/jboss/wildfly/bin/
RUN chmod a+x /opt/jboss/wildfly/bin/deploy-and-run.sh

# Switch back to jboss user
USER jboss

CMD /opt/jboss/wildfly/bin/deploy-and-run.sh
