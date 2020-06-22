FROM node:14.4-alpine3.12

ARG hub_version=2.14.2

WORKDIR /sync-script

ADD files/index.js index.js
ADD files/package.json package.json
ADD files/yarn.lock yarn.lock

RUN yarn install && rm -R /tmp/*

# Adding Github hub command
RUN apk add --no-cache ca-certificates tar git libc6-compat && \
    wget -O hub.tgz https://github.com/github/hub/releases/download/v${hub_version}/hub-linux-amd64-${hub_version}.tgz && \
    tar zxv -f hub.tgz --strip-components=2 hub-linux-amd64-${hub_version}/bin/hub && \
    mv hub /usr/local/bin/hub && \
    rm hub.tgz

ADD files/sync-privacy.sh /usr/local/bin/sync-privacy

ENTRYPOINT ["/bin/sh"]
