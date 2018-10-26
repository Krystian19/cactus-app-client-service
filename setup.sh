#!/bin/bash

# Install dependencies
yarn install

# Avoid a sass build bug
npm rebuild node-sass

# Build js and sass scripts  
yarn run build

# Run the app server
yarn start