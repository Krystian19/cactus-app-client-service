FROM ubuntu:16.04
MAINTAINER Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl

# Install node related stuff
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs

COPY . /app
EXPOSE 3000

# Install dependencies
RUN npm install

# Build js scripts
RUN npm run build

# Install service manager
RUN npm install -g forever

# ADD setup.sh /app
RUN ["chmod", "+x", "/app/setup.sh"]
ENTRYPOINT ["/app/setup.sh"]