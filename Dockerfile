FROM node:10.15.3-alpine
LABEL Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apk add --no-cache git

COPY . /app
EXPOSE 3000

# Install service manager
RUN npm install -g yarn@1.17.3

CMD /app/setup.sh