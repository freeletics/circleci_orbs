# Circle CI orbs

Source of Freeletics CircleCI orbs: https://circleci.com/docs/2.0/creating-orbs/


### Orbs list

- [freeletics/gradle-publish](gradle-publish/) - sign and publish Gradle artifacts
- [freeletics/prepare-mobile-workflow](prepare-mobile-workflow/) - caches everything (git and dependencies) and prepares workflow for further mobile builds (Android and iOS)
- [freeletics/firebase-testlab](firebase-testlab/) - run instrumnentation tests on Firebase TestLab
- [freeletics/kaniko-publish](kaniko-publish/) - Build and publish container images to container registries *without* docker
- [freeletics/privacy-sync](privacy-sync/) - Syncs privacy from Contentstack to repository

### Validating locally orbs

To validate orb locally, install first CircleCI CLI tool: https://circleci.com/docs/2.0/local-cli/

Then run following command:

``` shell
circleci config pack path-to-orb/ | circleci orb validate -
```
