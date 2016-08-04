FROM java:7-jdk

MAINTAINER deppisch@consol.de

EXPOSE 8080 4848 8181

ENV JAVA_HOME /usr/lib/jvm/java-7-openjdk-amd64
ENV GLASSFISH_VERSION v3

RUN curl --output /tmp/glassfish.zip http://download.oracle.com/glassfish/${GLASSFISH_VERSION}/release/glassfish-${GLASSFISH_VERSION}.zip
RUN cd /opt && unzip /tmp/glassfish.zip

# Remove unneeded files
RUN rm -f /tmp/glassfish.zip

ENV GLASSFISH_HOME /opt/glassfish${GLASSFISH_VERSION}
ENV PATH $PATH:${JAVA_HOME}/bin:${GLASSFISH_HOME}/bin

ADD deploy-and-run.sh ${GLASSFISH_HOME}/bin/
RUN chmod a+x ${GLASSFISH_HOME}/bin/deploy-and-run.sh

WORKDIR /opt/glassfish${GLASSFISH_VERSION}

CMD ${GLASSFISH_HOME}/bin/deploy-and-run.sh
