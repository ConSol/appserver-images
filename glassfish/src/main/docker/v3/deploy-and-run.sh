#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.war; do
     file=$(basename $i)
     echo "Linking $i --> /opt/glassfishv3/glassfish/domains/domain1/autodeploy/$file"
     ln -s $i /opt/glassfishv3/glassfish/domains/domain1/autodeploy/$file
  done
fi

cd /opt/glassfishv3 && asadmin start-domain -v
