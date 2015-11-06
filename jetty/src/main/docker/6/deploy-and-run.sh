#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
     echo "Linking $i --> /opt/jetty/webapps/$file"
     ln -s $i /opt/jetty/webapps/$file
  done
fi
export JAVA_OPTIONS="$JAVA_OPTIONS $(jolokia_opts) -Djava.security.egd=file:/dev/./urandom"
/usr/bin/env bash /opt/jetty/bin/jetty.sh run
