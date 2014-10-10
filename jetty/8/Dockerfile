FROM jolokia/java-jolokia:7

MAINTAINER roland@jolokia.org

EXPOSE 8080 8778

ENV JETTY_VERSION 8.1.15.v20140411
ENV DEPLOY_DIR /maven

RUN wget http://download.eclipse.org/jetty/${JETTY_VERSION}/dist/jetty-distribution-${JETTY_VERSION}.zip -O /tmp/jetty.zip

# Unpack
RUN cd /opt && jar xf /tmp/jetty.zip
RUN ln -s /opt/jetty-distribution-${JETTY_VERSION} /opt/jetty
RUN rm /tmp/jetty.zip

# Startup script
ADD deploy-and-run.sh /opt/jetty/bin/
RUN chmod a+x /opt/jetty/bin/deploy-and-run.sh

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/jetty/jolokia-agent.jar

ENV JAVA_OPTIONS -javaagent:/opt/tomcat/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV JETTY_HOME /opt/jetty
ENV PATH $PATH:$JETTY_HOME/bin

CMD /opt/jetty/bin/deploy-and-run.sh
