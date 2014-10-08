FROM java:7u60

MAINTAINER roland@jolokia.org

ENV JOLOKIA_VERSION 1.2.2

RUN mkdir /opt/jolokia && wget http://central.maven.org/maven2/org/jolokia/jolokia-jvm/1.2.2/jolokia-jvm-1.2.2-agent.jar -O /opt/jolokia/jolokia.jar

# Add environment setup script
ADD jolokia_env.sh /opt/jolokia/

# Default is printing out the version
CMD java -jar /opt/jolokia/jolokia.jar --version
