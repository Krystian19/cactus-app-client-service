FROM node:10.15.3-alpine
LABEL Jan Guzman <janfrancisco19@gmail.com>

WORKDIR /app

RUN apk add --no-cache git curl openrc

ENV exporter_version 0.16.0

RUN (cd /tmp && curl -LO https://github.com/prometheus/node_exporter/releases/download/v${exporter_version}/node_exporter-${exporter_version}.linux-amd64.tar.gz) \
    && tar -xvzf /tmp/node_exporter-${exporter_version}.linux-amd64.tar.gz -C /tmp \
    && cp /tmp/node_exporter-${exporter_version}.linux-amd64/node_exporter /usr/local/bin/

COPY . /app
EXPOSE 3000 9100

# Install service manager
RUN npm install -g yarn@1.12.3

CMD /app/setup.sh