FROM node:13.4.0-alpine3.10
LABEL Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apk add --no-cache git

COPY . /app
EXPOSE 3000

CMD /app/setup.sh