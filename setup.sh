#!/bin/sh

# Install dependencies
yarn install

# Build ts and sass scripts  
yarn build

# Start the node exporter service
nohup node_exporter &> /tmp/nohup.out&

# Run the app server
yarn start