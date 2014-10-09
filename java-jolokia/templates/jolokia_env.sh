#!/bin/bash
JOLOKIA_DIR=${JOLOKIA_DIR:-/opt/jolokia}
if [ -n "${JOLOKIA_DISABLE}" ]; then
   JOLOKIA_OPTS=""
else
   JOLOKIA_OPTS="-javaagent:${JOLOKIA_DIR}/jolokia.jar"
   JOLOKIA_CONFIG=${JOLOKIA_CONFIG:-$JOLOKIA_DIR/jolokia.properties}
   JOLOKIA_HOST=${JOLOKIA_HOST:-*}
   if [ -f "$JOLOKIA_CONFIG" ]; then
      JOLOKIA_ARGS="${JOLOKIA_ARGS},config=${JOLOKIA_CONFIG}"
   fi
   if [ -n "$JOLOKIA_PORT" ]; then
      JOLOKIA_ARGS="${JOLOKIA_ARGS},port=${JOLOKIA_PORT}"
   fi
   JOLOKIA_ARGS="${JOLOKIA_ARGS},host=${JOLOKIA_HOST}"
   if [ -n "$JOLOKIA_USER" ]; then
      JOLOKIA_ARGS="${JOLOKIA_ARGS},user=${JOLOKIA_USER}"
   fi
   if [ -n "$JOLOKIA_PASSWORD" ]; then
      JOLOKIA_ARGS="${JOLOKIA_ARGS},password=${JOLOKIA_PASSWORD}"
   fi
   if [ -n "$JOLOKIA_ARGS" ]; then
      JOLOKIA_OPTS="${JOLOKIA_OPTS}=${JOLOKIA_ARGS#?}"
   fi
fi
export JOLOKIA_OPTS
