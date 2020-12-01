FROM node:15.3.0-alpine3.12
LABEL Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apk add --no-cache git

COPY . /app
EXPOSE 3000

CMD /app/setup.sh