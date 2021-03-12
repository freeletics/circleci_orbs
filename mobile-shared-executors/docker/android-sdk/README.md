An image that contains Android SDK tools and accepted SDK licenses.

Hosted at https://hub.docker.com/r/freeletics/android-sdk/

## Contents

* OpenJDK 15.0.2
* Android SDK command line tools 3.0
* Android SDK license
* Android SDK preview license
* `ANDROID_HOME` env var is set
* appropriate Android SDK directories are added to `PATH`

## How to build

```bash
docker build -t freeletics/android-sdk:<version-tag> .
```

Only the `freeletics/android-sdk` image should get published. The other one is just used during the build.
