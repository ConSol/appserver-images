FROM java

MAINTAINER roland@jolokia.org

EXPOSE 8181 8101 8778

ENV KARAF_VERSION 2.4.0
ENV DEPLOY_DIR /maven

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64


RUN wget http://archive.apache.org/dist/karaf/${KARAF_VERSION}/apache-karaf-${KARAF_VERSION}.tar.gz -O /tmp/karaf.tar.gz

# Unpack
RUN tar xzf /tmp/karaf.tar.gz -C /opt
RUN ln -s /opt/apache-karaf-${KARAF_VERSION} /opt/karaf
RUN rm /tmp/karaf.tar.gz

# Add roles
ADD users.properties /opt/apache-karaf-${KARAF_VERSION}/etc/

# Startup script
ADD deploy-and-run.sh /opt/apache-karaf-${KARAF_VERSION}/bin/
RUN chmod +x /opt/apache-karaf-${KARAF_VERSION}/bin/deploy-and-run.sh

# jolokia agent
RUN wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/karaf/jolokia-agent.jar

# Remove unneeded apps
RUN rm -rf /opt/karaf/deploy/README 

# VOLUME ["/opt/karaf/data", "/tmp/hsperfdata_root"

ENV KARAF_OPTS -javaagent:/opt/karaf/jolokia-agent.jar=host=0.0.0.0,port=8778,agentId=cheese
ENV KARAF_HOME /opt/karaf
ENV PATH $PATH:$KARAF_HOME/bin

CMD /opt/karaf/bin/deploy-and-run.sh
