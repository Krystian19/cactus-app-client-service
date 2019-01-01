# Cactus app web client service
![Build Status](https://travis-ci.org/Krystian19/cactus-app-client-service.svg?branch=master) [![Code Climate](https://codeclimate.com/github/Krystian19/cactus-app-client-service/badges/gpa.svg)](https://codeclimate.com/github/Krystian19/cactus-app-client-service) [![Test Coverage](https://codecov.io/gh/Krystian19/cactus-app-client-service/branch/master/graph/badge.svg)](https://codecov.io/gh/Krystian19/cactus-app-client-service)

Cactus app web client service repo.

## Requirements
```
docker -v
Docker version 18.03.0-ce
```

## Docker-compose setup example
How to use it inside a docker-compose file:
```yaml
version: '3'

services:
  client: # React client
    container_name: cactus_app_client
    build:
      ./cactus-app-client-service
    volumes:
      - ./cactus-app-client-service:/app
    environment:
      # URL of the service that is running a backend instance
      BACKEND_SERVICE_URL: "http://backend:3000/"
    ports: ['3000:3000']
```

## Standalone Setup

Inside the project's directory ...

Before we start, add these ignore options to your local repo:
```sh
# Tell git to ignore file permission changes
git config core.filemode false

# (Only if you are in windows). Tell git to ignore file line endings
git config core.autocrlf false
```

Build the docker image:
```
docker build --no-cache -t cactus_app/cactus-app-client-service .
```

### Run the project
Run these commands:
```sh
# Make sure setup.sh has the right permissions
chmod +x setup.sh

# (Run this if you are in windows) Bulk removal of CRLF line endings (avoid windows bug related to file line endings (CRLF))
sed -i -e 's/\r$//' setup.sh
```

Then create docker container. (Note: where "$(pwd)" is the absolute path to your local repo):
```sh
docker run -ti --name=cactus_app_client -d -v $(pwd):/app -p 3000:3000 cactus_app/cactus-app-client-service
```

Wait a couple seconds and then the project should be running @ ```http://localhost:3000/```.

## How to work with the project ?

Start watch of js changes:
```sh
docker exec -ti cactus_app_client yarn watch_js
```

Start watch of sass changes:
```sh
docker exec -ti cactus_app_client yarn watch_scss
```
## Run the tests
```sh
docker exec -ti cactus_app_client yarn test
```
## Translates Japan's Date and time to UTC with moment-timezone.js
```js
moment.tz('2018-10-07 00:30', 'Japan').utc().format('YYYY-MM-DD HH:mm:ss A');
```

### Todo list
- [ ] Setup props validation in all the view components

## License
MIT © Jan Guzman
