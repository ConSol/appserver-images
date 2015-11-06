#!/bin/sh
DIR=${DEPLOY_DIR:-/maven}
echo "Checking for *.kars in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/*.kar; do
     file=$(basename $i)
     echo "Linking $i --> /opt/karaf/deploy/$file"
     ln -s $i /opt/karaf/deploy/$file
  done
fi
# Use faster (though more unsecure) random number generator
export KARAF_OPTS="$KARAF_OPTS $(jolokia_opts) -Djava.security.egd=file:/dev/./urandom"
/opt/karaf/bin/karaf server
