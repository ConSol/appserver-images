FROM {{= it.javaBaseImage }}

MAINTAINER {{= it.maintainer }}

ENV JOLOKIA_VERSION {{= it.config.version }}

RUN mkdir /opt/jolokia && wget {{= it.config.downloadBaseUrl}}/{{= it.config.version}}/jolokia-jvm-{{= it.config.version}}-agent.jar -O /opt/jolokia/jolokia.jar

# Add environment setup script
ADD jolokia_env.sh /opt/jolokia/

# Default is printing out the version
CMD java -jar /opt/jolokia/jolokia.jar --version
