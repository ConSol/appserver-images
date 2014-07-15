#!/bin/sh
{{
   var meta = it.meta[it.version];
   var optsVar = meta.optsVar || "CATALINA_OPTS";
   var runCmd = meta.runCmd || "catalina.sh";
}}
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
export {{= optsVar}}="-Djava.security.egd=file:/dev/./urandom"
/opt/tomcat/bin/{{= runCmd}} run
