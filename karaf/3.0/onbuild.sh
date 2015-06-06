#!/bin/bash

OIFS=$IFS
IFS=','

if [ "x" != "x${FEATURES_REPOS}" ]; then
  for repo in ${FEATURES_REPOS}
  do
    echo ${repo}
  done
fi

if [ "x" != "x${FEATURES_BOOT}" ]; then
  for feature in ${FEATURES_BOOT}
  do
    echo $feature
  done
fi

IFS=$OIFS
