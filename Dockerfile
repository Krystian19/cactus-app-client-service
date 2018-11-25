FROM ubuntu:18.04
MAINTAINER Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

# Setup container dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl gnupg

# Install node related stuff
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

COPY . /app
EXPOSE 3000

# Install service manager
RUN npm install -g yarn

# Install global dependencies
RUN yarn global add webpack@4.6.0 gulp@3.9.1 nodemon@1.18.6

# Install global babel dependencies
RUN yarn global add @babel/core@7.1.6 @babel/register@7.0.0 @babel/node@7.0.0 babel-cli@6.26.0

# Make sure /app/setup.sh has the right persmissions inside the container
RUN ["chmod", "+x", "/app/setup.sh"]

# Bulk removal of CRLF line endings (avoid windows bug related to file line endings (CRLF))
RUN sed -i -e 's/\r$//' /app/setup.sh

CMD /app/setup.sh