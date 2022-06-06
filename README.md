# Cactus app web client service

[![Build Status](https://travis-ci.org/Krystian19/cactus-app-client-service.svg?branch=master)](https://travis-ci.org/Krystian19/cactus-app-client-service) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/13cae8df73d54af1b59af877141de2f6)](https://www.codacy.com/gh/Krystian19/cactus-app-client-service/dashboard?utm_source=github.com&utm_medium=referral&utm_content=Krystian19/cactus-app-client-service&utm_campaign=Badge_Grade) [![Test Coverage](https://codecov.io/gh/Krystian19/cactus-app-client-service/branch/master/graph/badge.svg)](https://codecov.io/gh/Krystian19/cactus-app-client-service)

Cactus app web client service repo.

## How to work with the project ?

Start the watching for ts and sass changes:
```sh
docker exec -ti cactus_client yarn watch
```

## Run the tests
```sh
docker exec -ti cactus_client yarn test
```

## Utils

### Translates Japan's Date and time to UTC with moment-timezone.js ...
```js
moment.tz('2018-10-07 00:30', 'Japan').utc().format('YYYY-MM-DD HH:mm:ss A');
```

## License
MIT © [Jan Guzman](https://github.com/Krystian19)
