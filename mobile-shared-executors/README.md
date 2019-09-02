## Mobile platforms (Android, iOS) common executors

This folder contains definition for common mobile executors, that could be included
into orb via following command:

``` shell
$ mkdir -p orb-name/executors
$ cd orb-name/executors
$ ln -s ../../mobile-shared-executors/android-small.yml
```

### List of executors

Android executors (have installed Android SDK tools and OpenJDK):
- [android-small](android-small.yml) - utilizes CircleCI [small resource class](https://circleci.com/docs/2.0/configuration-reference/#resource_class)
- [android-medium](android-medium.yml) - utilizes CircleCI [medium resource class](https://circleci.com/docs/2.0/configuration-reference/#resource_class)
- [android-medium-plus](android-medium-plus.yml) - utilizes CircleCI [medium plus resource class](https://circleci.com/docs/2.0/configuration-reference/#resource_class)
- [android-large](android-large.yml) - utilizes CircleCI [large resource class](https://circleci.com/docs/2.0/configuration-reference/#resource_class)
- [android-xlarge](android-xlarge.yml) - utilizes CircleCI [xlarge resource class](https://circleci.com/docs/2.0/configuration-reference/#resource_class)

Fastlane executors:
- [fastlane-android-small](fastlane-android-small.yml) - Fastlane tools added on top of android SDK and utilizes small resource class
- [fastlane-android-large](fastlane-android-large.yml) - Fastlane tools added on top of android SDK and utilizes large resource class

### Dockerfiles

[docker](./docker/) contains `Dockerfiles` that is used to build Docker images for some of executors above:
- [android-sdk](./docker/android-sdk/README.md) - create an image with Android SDK and OpenJDK bundled inside
- [android-sdk-fastlane)(./docker/android-sdk-fastlane/README.md) - adds fastlane on top of android sdk image
