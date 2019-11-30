#!/bin/sh

# Install dependencies
yarn install

# Generate GraphQL TS Types
yarn gqlgen

# Build ts and sass scripts  
yarn build

# Run the app server
yarn start