#!/bin/bash

# Avoid a sass build bug
npm rebuild node-sass --force

# Build js scripts  
npm run build_scss

# Build js scripts
npm run build_js

# Run the server with forever
forever start server.js

/bin/bash