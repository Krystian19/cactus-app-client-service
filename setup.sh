#!/bin/bash

# Install dependencies
yarn install

# Build js and sass scripts  
yarn run build

# Run the server with forever
forever start server.js

/bin/bash