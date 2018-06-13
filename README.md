# ReactDockerBoilerplate

React app running on a express.js server inside a ubuntu container in docker.

## Requirements
```
docker -v
Docker version 18.03.0-ce
```

## Setup the project

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
docker build --no-cache -t janguzman/react_docker_boilerplate .
```

### For development deployment

Make sure setup.sh has the right permissions:
```sh
# Only if you are in linux
chmod +x setup.sh

# Only if you are in windows
sed -i -e 's/\r$//' setup.sh
```

Create docker container. (Note: where "$(pwd)" is the absolute path to your local repo):
```sh
docker run -ti --name=react_docker -d -v $(pwd):/app -p 3000:3000 janguzman/react_docker_boilerplate
```

The project should be running @ ```http://localhost:3000/```.

To work inside the container ...

Access container:
```sh
docker exec -ti react_docker /bin/bash
```

Start watch of js changes:
```sh
yarn watch_js
```

Start watch of sass changes:
```sh
yarn watch_scss
```

### For production deployment

Create docker container:
```
docker run -ti -p 3000:3000 --name react_docker -d janguzman/react_docker_boilerplate
```

The project should be running @ ```http://localhost:3000/```

In case you need to access the container ...

Access container:
```sh
docker exec -ti react_docker /bin/bash
```

## License
MIT © Jan Guzman
