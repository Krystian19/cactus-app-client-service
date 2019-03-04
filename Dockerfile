FROM ubuntu:18.04
LABEL MAINTAINER="Jan Guzman <janfrancisco19@gmail.com>" 

WORKDIR /app

# Setup container dependencies
RUN apt-get update && apt-get install -y --no-install-recommends apt-utils
RUN apt-get install -y curl gnupg git

# Install node related stuff
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

COPY . /app
EXPOSE 3000

# Install service manager
RUN npm install -g yarn@1.12.3

CMD /app/setup.sh