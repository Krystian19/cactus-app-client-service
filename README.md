# Cactus app web client service

[![Build Status](https://travis-ci.org/Krystian19/cactus-app-client-service.svg?branch=master)](https://travis-ci.org/Krystian19/cactus-app-client-service) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/166aa4764f6244538723d85594ab60b7)](https://www.codacy.com/app/janfrancisco19/cactus-app-client-service?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Krystian19/cactus-app-client-service&amp;utm_campaign=Badge_Grade) [![Test Coverage](https://codecov.io/gh/Krystian19/cactus-app-client-service/branch/master/graph/badge.svg)](https://codecov.io/gh/Krystian19/cactus-app-client-service)

Cactus app web client service repo.

## How to work with the project ?

Start the watching for ts and sass changes:
```sh
docker exec -ti cactus_app_client yarn watch
```

## Run the tests
```sh
docker exec -ti cactus_app_client yarn test
```

## Utils

### Translates Japan's Date and time to UTC with moment-timezone.js ...
```js
moment.tz('2018-10-07 00:30', 'Japan').utc().format('YYYY-MM-DD HH:mm:ss A');
```

## License
MIT © [Jan Guzman](https://github.com/Krystian19)
