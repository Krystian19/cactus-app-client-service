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

# Install service manager
RUN npm install -g yarn

RUN yarn global add forever webpack@4.6.0 gulp@3.9.1

# ADD setup.sh /app
RUN ["chmod", "+x", "/app/setup.sh"]

# Modifying permissions of setup.sh (avoid windows bug related to file line endings (CRLF))
RUN sed -i -e 's/\r$//' /app/setup.sh
ENTRYPOINT ["/app/setup.sh"]