#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
     echo "Linking $i --> ${JBOSS_DIR}/standalone/deployments/$file"
     ln -s $i ${JBOSS_DIR}/standalone/deployments/$file
  done
fi
# Use faster (though more unsecure) random number generator
export JAVA_OPTS="$JAVA_OPTS -Djava.security.egd=file:/dev/./urandom"
/opt/jboss/bin/standalone.sh -b 0.0.0.0
