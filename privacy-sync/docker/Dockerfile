FROM node:14.4-buster-slim

ARG hub_version=2.14.2

WORKDIR /sync-script

ADD files/index.js index.js
ADD files/package.json package.json
ADD files/yarn.lock yarn.lock

RUN yarn install && rm -R /tmp/*

# Adding Github hub command and required dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates tar git openssh-client wget gpg && \
    rm -Rf /var/lib/apt && \
    rm -Rf /var/log && \
    rm -Rf /var/cache && \
    wget -O hub.tgz https://github.com/github/hub/releases/download/v${hub_version}/hub-linux-amd64-${hub_version}.tgz && \
    tar zxv -f hub.tgz --strip-components=2 hub-linux-amd64-${hub_version}/bin/hub && \
    mv hub /usr/local/bin/hub && \
    rm hub.tgz

ADD files/sync-privacy.sh /usr/local/bin/sync-privacy

ENTRYPOINT ["/bin/sh"]
