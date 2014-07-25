FROM dockerfile/java

MAINTAINER deppisch@consol.de

EXPOSE 8080

ENV JETTY_VERSION 7.6.15.v20140411
ENV DEPLOY_DIR /maven

RUN wget http://download.eclipse.org/jetty/${JETTY_VERSION}/dist/jetty-distribution-${JETTY_VERSION}.zip -O /tmp/jetty.zip

# Unpack
RUN unzip /tmp/jetty.zip -d /opt
RUN ln -s /opt/jetty-distribution-${JETTY_VERSION} /opt/jetty
RUN rm /tmp/jetty.zip

# Startup script
ADD deploy-and-run.sh /opt/jetty/bin/
RUN chmod a+x /opt/jetty/bin/deploy-and-run.sh

ENV JETTY_HOME /opt/jetty
ENV PATH $PATH:$JETTY_HOME/bin

CMD /opt/jetty/bin/deploy-and-run.sh
