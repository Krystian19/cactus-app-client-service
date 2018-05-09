# ReactDockerBoilerplate

React app running on a express.js server inside a ubuntu container in docker.

# Requirements
```
docker -v
Docker version 18.03.0-ce
```

# Setup the project

Inside the project's directory ...

Build the docker image
```
docker build --no-cache -t janguzman/react_docker_boilerplate .
```

Create docker container
```
docker run -ti -p 3000:3000 --name react_docker -d janguzman/react_docker_boilerplate
```

The project should be running @ ```http://localhost:3000/```.

# Access container

Enter the container working directory
```
docker exec -ti react_docker /bin/bash
```

## License
MIT © Jan Guzman
