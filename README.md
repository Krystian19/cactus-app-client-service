# ReactDockerBoilerplate

React app running on a express.js server inside a ubuntu container in docker.

## Requirements
```
docker -v
Docker version 18.03.0-ce
```

## Setup the project

Inside the project's directory ...

Build the docker image
```
docker build --no-cache -t janguzman/react_docker_boilerplate .
```

### For development deployment

Make sure setup.sh has permissions to execute
```sh
chmod +x setup.sh

sed -i -e 's/\r$//' setup.sh # If you are in windows
```

Create docker container
```
docker run -ti --name=react_docker -d -v $(pwd):/app -p 3000:3000 janguzman/react_docker_boilerplate
```

The project should be running @ ```http://localhost:3000/```. To work using this container's environment
remember to stop the ```forever``` service and start the node server and watch scripts.

### For production deployment

Create docker container
```
docker run -ti -p 3000:3000 --name react_docker -d janguzman/react_docker_boilerplate
```

The project should be running @ ```http://localhost:3000/```


## Access container

Enter the container working directory
```
docker exec -ti react_docker /bin/bash
```

## License
MIT © Jan Guzman
