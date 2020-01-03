FROM openjdk:8-jre-alpine

# Installing google cloud and flank for firebase test lab
ENV CLOUD_SDK_VERSION 274.0.1
ENV FLANK_VERSION 8.1.0
ENV YQ_VERSION 2.4.1
ENV PATH /google-cloud-sdk/bin:/usr/local/bin:$PATH

ADD files/flank.sh /usr/local/bin/flank

RUN apk --no-cache add \
        curl \
        sudo \
        python \
        py-crcmod \
        bash \
        jq \
        libc6-compat \
        openssh-client \
        git && \
        curl --output /usr/local/bin/flank.jar --location --fail https://github.com/TestArmada/flank/releases/download/v${FLANK_VERSION}/flank.jar && \
        chmod +x /usr/local/bin/flank && \
        curl --output /usr/local/bin/merge_junit_results.py --location --fail https://gist.githubusercontent.com/cgoldberg/4320815/raw/75ba2b7cc8b477bc784631e28ffd586f79efa3f7/merge_junit_results.py && \
        chmod +x /usr/local/bin/merge_junit_results.py && \
        curl --output /usr/local/bin/yq --location --fail https://github.com/mikefarah/yq/releases/download/${YQ_VERSION}/yq_linux_amd64 && \
        chmod +x /usr/local/bin/yq && \
        curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
        tar xzf google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
        rm google-cloud-sdk-${CLOUD_SDK_VERSION}-linux-x86_64.tar.gz && \
        ln -s /lib /lib64 && \
        gcloud config set core/disable_usage_reporting true && \
        gcloud config set component_manager/disable_update_check true && \
        gcloud config set metrics/environment github_docker_image && \
        gcloud --version && \
        rm -rf /tmp/*

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

# Copied from circleci/android dockerfile
RUN addgroup -g 3434 circleci \
  && adduser -u 3434 -D -G circleci -s /bin/bash circleci \
  && echo 'circleci ALL=NOPASSWD: ALL' >> /etc/sudoers.d/50-circleci

USER circleci

CMD ["/bin/sh"]

# Switching user can confuse Docker's idea of $HOME, so we set it explicitly
ENV HOME /home/circleci
ENV PATH /google-cloud-sdk/bin:/usr/local/bin:$PATH

ADD --chown=circleci:circleci files/dummy.apk /home/circleci/dummy.apk
