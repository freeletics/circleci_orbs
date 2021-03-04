FROM freeletics/android-sdk:1.5

# Adding Android bundletool
COPY files/bundletool-all-0.11.0.jar /usr/bin/bundletool.jar
COPY files/bundletool.sh /usr/bin/bundletool.sh

# Install Ruby
RUN sudo apt-get update \
    && sudo mkdir -p /var/cache/apt/archives/partial \
    && sudo mkdir -p /var/log/apt \
    && sudo apt-get install -y \
      ruby-dev \
      build-essential \
      jq \
    && sudo rm -Rf /var/lib/apt \
    && sudo rm -Rf /var/log \
    && sudo rm -Rf /var/cache

# Install fastlane
ADD files/Gemfile Gemfile
RUN sudo gem install -g Gemfile && \
    sudo gem cleanup && \
    sudo rm -rf /usr/lib/ruby/gems/*/cache/*

ENV FASTLANE_SKIP_UPDATE_CHECK true
