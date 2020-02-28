# Ref: https://github.com/GoogleContainerTools/kaniko/blob/4feed0ff357cc224b73fc36326d4b6df6748893a/deploy/Dockerfile_debug
FROM gcr.io/kaniko-project/executor:v0.17.1 as builder

FROM debian:10.3-slim

COPY --from=builder /kaniko /kaniko
RUN echo "{}" > /kaniko/.docker/config.json

ENV PATH="$PATH:/kaniko" \
    SSL_CERT_DIR=/kaniko/ssl/certs \
    DOCKER_CONFIG=/kaniko/.docker/

# Declare /workspace as a volume so kaniko leaves it alone
VOLUME /workspace
WORKDIR /workspace

ENTRYPOINT ["/kaniko/executor"]
