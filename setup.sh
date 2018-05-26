#!/bin/bash

# Install dependencies
yarn install

# Avoid a sass build bug
yarn add node-sass --force

# Build js and sass scripts  
yarn run build

# Run the server with forever
forever start server.js

/bin/bash