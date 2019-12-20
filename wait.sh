#!/bin/sh

# Waits until cactus_bff container is healthy. (Is only used in Travis.CI).
until [ "`docker inspect -f {{.State.Health.Status}} cactus_bff`" == "healthy" ]; do
  sleep 10;
  echo "Wait until cactus bff is ready";
done;