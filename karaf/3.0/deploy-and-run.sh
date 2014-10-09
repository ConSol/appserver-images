#!/bin/sh


DIR=${DEPLOY_DIR:-/maven}
echo "Checking *.war in $DIR"
if [ -d $DIR ]; then
  for i in $DIR/; do
     file=$(basename $i)
     echo "Linking $i --> /opt/karaf/deploy/$file"
     ln -s $i /opt/karaf/deploy/$file
  done
fi
# Use faster (though more unsecure) random number generator
export KARAF_OPTS="$KARAF_OPTS -Djava.security.egd=file:/dev/./urandom"
/opt/karaf/bin/karaf server
