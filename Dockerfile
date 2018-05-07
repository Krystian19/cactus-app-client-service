FROM ubuntu:16.04
MAINTAINER Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

# Setup container dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl

# Install node related stuff
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

COPY . /app
EXPOSE 3000

# Install dependencies
RUN npm install

# Install service manager
RUN npm install -g forever webpack@4.6.0 gulp@3.9.1

# Avoid a sass build bug
RUN npm rebuild node-sass --force

# Build js scripts
RUN npm run build_scss

# Build js scripts
RUN npm run build_js

# ADD setup.sh /app
RUN ["chmod", "+x", "/app/setup.sh"]
ENTRYPOINT ["/app/setup.sh"]