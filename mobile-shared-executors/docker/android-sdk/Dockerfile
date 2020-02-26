ARG SDK_TOOLS_IMAGE=freeletics/android-sdk-tools
ARG JDK_IMAGE=openjdk:8u242

FROM ${SDK_TOOLS_IMAGE} as android-sdk-tools

FROM ${JDK_IMAGE}

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
ENV PATH=${ANDROID_HOME}/emulator:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${ANDROID_HOME}/platform-tools:${PATH}
ENV TERM dumb
