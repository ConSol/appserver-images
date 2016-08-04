#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
     echo "Linking $i --> /opt/jboss/wildfly/standalone/deployments/$file"
     ln -s $i /opt/jboss/wildfly/standalone/deployments/$file
  done
fi
/usr/bin/env bash /opt/jboss/wildfly/bin/standalone.sh -b 0.0.0.0
