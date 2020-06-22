# Privacy Policy & Referral Terms and Conditions contents generation docker image

## Hot-to build the image

Run:

``` shell
docker build -t freeletics/privacy-sync:1.0 .
docker run --rm --entrypoint cat freeletics/privacy-sync:1.0 /sync-script/yarn.lock > files/yarn.lock
```

## Generation
To convert the Privacy Policy & Referral Terms and Conditions to a user-friendly form, use the following command:

```
docker run --rm freeletics/privacy-sync:1.0 sync-privacy --privacyDir=./path/to/privacy --inviteDir=./path/to/invite/policy
```

This should regenerate privacy policy and invite policy html files.
