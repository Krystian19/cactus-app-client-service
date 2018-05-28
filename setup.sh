#!/bin/bash

# Install dependencies
yarn install

# Avoid a sass build bug
npm rebuild node-sass

# Build js and sass scripts  
yarn run build

# Run the server with forever
forever start server.js

/bin/bash