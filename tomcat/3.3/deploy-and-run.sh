#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
     echo "Linking $i --> /opt/tomcat/webapps/$file"
     ln -s $i /opt/tomcat/webapps/$file
  done
fi

# Use faster (though more unsecure) random number generator
export TOMCAT_OPTS="$TOMCAT_OPTS $(jolokia_opts) -Djava.security.egd=file:/dev/./urandom"
/opt/tomcat/bin/tomcat run
