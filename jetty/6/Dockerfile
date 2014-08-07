FROM java

MAINTAINER roland@jolokia.org

EXPOSE 8080

ENV JETTY_VERSION 6.1.26
ENV DEPLOY_DIR /maven

RUN wget http://dist.codehaus.org/jetty/jetty-${JETTY_VERSION}/jetty-${JETTY_VERSION}.zip -O /tmp/jetty.zip

# Unpack
RUN unzip /tmp/jetty.zip -d /opt
RUN ln -s /opt/jetty-${JETTY_VERSION} /opt/jetty
RUN rm /tmp/jetty.zip

# Startup script
ADD deploy-and-run.sh /opt/jetty/bin/
RUN chmod a+x /opt/jetty/bin/deploy-and-run.sh

ENV JETTY_HOME /opt/jetty
ENV PATH $PATH:$JETTY_HOME/bin

CMD /opt/jetty/bin/deploy-and-run.sh
