# Kaniko Publish Orb

Build and publish container images to container registries *without* docker

Under the hood this uses Google's [Kaniko](https://github.com/GoogleContainerTools/kaniko) project, but aims to provide a very similar interface to the [circleci/docker-publish](https://circleci.com/orbs/registry/orb/circleci/docker-publish) orb.

## Usage

See https://github.com/freeletics/circleci_orbs/tree/master/kaniko-publish-orb for the full details.

```
orbs:
  kaniko-publish: freeletics/kaniko-publish@0.2.0

workflows:
  flow:
    jobs:
      - kaniko-publish/publish
```

## Credits

Thanks to [Glenjamin](https://github.com/glenjamin/) for the amazing work on [Kaniko Publish Orb](https://github.com/glenjamin/kaniko-publish-orb/)
