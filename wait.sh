#!/bin/sh

if [ "$1" == "" ]; then
  echo "No URL provided to wait for"
  echo exit
fi

# Waits until cactus.bff is ready to accept connections (Only used inside of travis.ci).
while ! echo exit | curl -I --fail $1;
do
  echo "Waiting for $1 to be available"
  ((c++)) && ((c==10)) && break
  sleep 10
done