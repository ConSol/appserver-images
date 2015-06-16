FROM jolokia/java-jolokia:7

MAINTAINER roland@jolokia.org

EXPOSE 8181 8101 8778

ENV KARAF_VERSION 3.0.3

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
    rm -rf /opt/karaf/deploy/README  && \
    perl -p -i -e 's/^(log4j.rootLogger.*?,\s*)out(.*)/${1}stdout${2}/' /opt/karaf/etc/org.ops4j.pax.logging.cfg

ENV PATH $PATH:/opt/karaf/bin

CMD /opt/karaf/bin/deploy-and-run.sh
