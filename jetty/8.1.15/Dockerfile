FROM dockerfile/java

MAINTAINER deppisch@consol.de

EXPOSE 8080

ENV JETTY_VERSION 8.1.15.v20140411 
ENV DEPLOY_DIR /maven

RUN wget http://download.eclipse.org/jetty/${JETTY_VERSION}/dist/jetty-distribution-${JETTY_VERSION}.tar.gz -O /tmp/jetty-distribution-${JETTY_VERSION}.tar.gz

# Unpack
RUN tar xzf /tmp/jetty-distribution-${JETTY_VERSION}.tar.gz -C /opt
RUN ln -s /opt/jetty-distribution-${JETTY_VERSION} /opt/jetty
RUN rm /tmp/jetty-distribution-${JETTY_VERSION}.tar.gz

# Startup script
ADD deploy-and-run.sh /opt/jetty/bin/

ENV JETTY_HOME /opt/jetty
ENV PATH $PATH:$JETTY_HOME/bin

CMD /opt/jetty/bin/deploy-and-run.sh 
