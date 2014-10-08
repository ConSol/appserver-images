FROM {{= it.javaJolokiaBaseImage }}

MAINTAINER {{= it.maintainer }}

EXPOSE 8080 8778

ENV JETTY_VERSION {{= it.config.version }}
ENV DEPLOY_DIR /maven

RUN wget {{= it.config.downloadUrl}} -O /tmp/jetty.zip

# Unpack
RUN cd /opt && jar xf /tmp/jetty.zip
RUN ln -s /opt/{{= it.config.baseName }}-${JETTY_VERSION} /opt/jetty
RUN rm /tmp/jetty.zip

# Startup script
ADD deploy-and-run.sh /opt/jetty/bin/
RUN chmod a+x /opt/jetty/bin/deploy-and-run.sh

ENV JETTY_HOME /opt/jetty
ENV PATH $PATH:$JETTY_HOME/bin

CMD /opt/jetty/bin/deploy-and-run.sh
