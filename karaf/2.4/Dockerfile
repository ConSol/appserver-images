FROM jolokia/java-jolokia:7

MAINTAINER roland@jolokia.org

EXPOSE 8181 8101 8778

ENV KARAF_VERSION 2.4.2

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64


RUN wget http://archive.apache.org/dist/karaf/${KARAF_VERSION}/apache-karaf-${KARAF_VERSION}.tar.gz -O /tmp/karaf.tar.gz && \
    tar xzf /tmp/karaf.tar.gz -C /opt/ && \
    ln -s /opt/apache-karaf-${KARAF_VERSION} /opt/karaf && \
    rm /tmp/karaf.tar.gz

# Add roles
ADD users.properties /opt/apache-karaf-${KARAF_VERSION}/etc/

# Jolokia config
ADD jolokia.properties /opt/jolokia/jolokia.properties

# Startup script
ADD deploy-and-run.sh /opt/karaf/bin/ 

RUN chmod a+x /opt/karaf/bin/deploy-and-run.sh && \
    rm -rf /opt/karaf/deploy/README 

ENV PATH $PATH:/opt/karaf/bin

CMD /opt/karaf/bin/deploy-and-run.sh
