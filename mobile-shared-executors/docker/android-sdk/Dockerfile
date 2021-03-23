# First build stage
# - download and unpack Android SDK tools
# - add Android SDK license hashes
FROM alpine:3.11.6 as android-sdk-tools

# Android SDK location
ARG android_home=/android-sdk
RUN mkdir -p ${android_home}/cmdline-tools
RUN mkdir -p ${android_home}/licenses

# Accept Android SDK licenses
RUN echo -e "24333f8a63b6825ea9c5514f83c2829b004d1fee\n" > "${android_home}/licenses/android-sdk-license"
RUN echo -e "84831b9409646a918e30573bab4c9c91346d8abd\n" > "${android_home}/licenses/android-sdk-preview-license"

# Download and install Android SDK
ARG CMDLINE_TOOLS_REVISION=6858069_latest # 3.0
ARG sdk_file=commandlinetools-linux-${CMDLINE_TOOLS_REVISION}.zip
RUN wget -q -O /tmp/${sdk_file} https://dl.google.com/android/repository/${sdk_file}
RUN unzip -qo /tmp/${sdk_file} -d ${android_home}/cmdline-tools
RUN mv ${android_home}/cmdline-tools/cmdline-tools ${android_home}/cmdline-tools/latest

# Second build stage
# - OpenJDK + Android SDK
# - some utilities
FROM openjdk:15.0.2-jdk-slim

RUN apt-get update \
  && apt-get install -y \
    git \
    locales \
    sudo \
    ca-certificates \
    jq \
  && rm -Rf /var/lib/apt \
  && rm -Rf /var/log \
  && rm -Rf /var/cache

# Set timezone to UTC by default
RUN ln -sf /usr/share/zoneinfo/Etc/UTC /etc/localtime

# Use unicode
RUN locale-gen C.UTF-8 || true
ENV LANG=C.UTF-8

# Copied from circleci/android dockerfile
RUN groupadd --gid 3434 circleci \
  && useradd --uid 3434 --gid circleci --shell /bin/bash --create-home circleci \
  && echo 'circleci ALL=NOPASSWD: ALL' >> /etc/sudoers.d/50-circleci \
  && echo 'Defaults    env_keep += "DEBIAN_FRONTEND"' >> /etc/sudoers.d/env_keep

USER circleci

CMD ["/bin/sh"]

# Switching user can confuse Docker's idea of $HOME, so we set it explicitly
ENV HOME /home/circleci

# Android SDK
ARG android_home=$HOME/android-sdk
COPY --chown=circleci:circleci --from=android-sdk-tools /android-sdk ${android_home}

# Set environmental variables
ENV ANDROID_HOME ${android_home}
ENV PATH=${ANDROID_HOME}/emulator:${ANDROID_HOME}/cmdline-tools/latest:${ANDROID_HOME}/platform-tools:${PATH}
ENV TERM dumb
