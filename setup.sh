#!/bin/bash

# Install dependencies
npm install

# Avoid a sass build bug
npm rebuild node-sass

# Build js and sass scripts  
npm run build

# Run the server with forever
forever start server.js

/bin/bash