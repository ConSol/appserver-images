FROM dockerfile/java

MAINTAINER georgi@consol.de 

EXPOSE 8080

ENV JBOSS_VERSION 7.0.2
ENV JBOSS_DIR /opt/jboss-as-web-${JBOSS_VERSION}.Final
ENV DEPLOY_DIR /maven

ENV http_proxy 10.250.0.180:8001
RUN wget http://download.jboss.org/jbossas/7.0/jboss-as-${JBOSS_VERSION}.Final/jboss-as-web-${JBOSS_VERSION}.Final.tar.gz -O /tmp/jboss.tar.gz

# Unpack
RUN tar xzf /tmp/jboss.tar.gz -C /opt
RUN ln -s ${JBOSS_DIR} /opt/jboss
RUN rm /tmp/jboss.tar.gz

# Startup script
ADD deploy-and-run.sh ${JBOSS_DIR}/bin/

CMD /opt/jboss/bin/deploy-and-run.sh
