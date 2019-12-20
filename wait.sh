#!/bin/sh

# Waits until cactus.bff is ready to accept connections (Only used inside of travis.ci).
while ! echo exit | curl -I --fail "http://localhost:4000";
do
  echo "Waiting for cactus.bff to start"
  ((c++)) && ((c==10)) && break
  sleep 10
done