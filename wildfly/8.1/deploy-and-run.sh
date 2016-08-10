#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
APPSRVHOME="/opt/wildfly"
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
	 dest="$APPSRVHOME/standalone/deployments/$file"
     echo "Linking $i --> $dest"
     ln -s $i $dest
  done
fi
# start app server with fast but unsecure random number generator
JAVA_OPTS="$JAVA_OPTS -Djava.security.egd=file:/dev/./urandom" $APPSRVHOME/bin/standalone.sh
