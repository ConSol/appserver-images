#!/bin/sh
asadmin start-domain
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for file in $DIR/*.war; do
     asadmin deploy ${file}
  done
fi

sleep 60
# Use faster (though more unsecure) random number generator
# export CATALINA_OPTS="$CATALINA_OPTS -Djava.security.egd=file:/dev/./urandom"
