# ReactDockerBoilerplate

React app running on a express.js server inside a docker ubuntu container.

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

### Run the project
Make sure setup.sh has the right permissions:
```sh
# Only if you are in linux
chmod +x setup.sh
```

Then create docker container. (Note: where "$(pwd)" is the absolute path to your local repo):
```sh
docker run -ti --name=react_docker -d -v $(pwd):/app -p 3000:3000 janguzman/react_docker_boilerplate
```

Wait a couple seconds and then the project should be running @ ```http://localhost:3000/```.

How to work with the project ...

Start watch of js changes:
```sh
docker exec -ti react_docker yarn watch_js
```

Start watch of sass changes:
```sh
docker exec -ti react_docker yarn watch_scss
```

## License
MIT © Jan Guzman
