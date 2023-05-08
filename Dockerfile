FROM ubuntu:22.04
RUN apt-get update && apt-get install -y git curl build-essential

RUN curl -L https://golang.org/dl/go1.20.1.linux-arm64.tar.gz | tar -xz -C /usr/local
ENV PATH="$PATH:/usr/local/go/bin"
ENV CGO_ENABLED=1

RUN useradd -d /home/app app && mkdir -p /home/app && chown app:app /home/app
USER app
RUN mkdir -p /home/app/src
WORKDIR /home/app/src

RUN go install --tags extended github.com/gohugoio/hugo@latest
WORKDIR /home/app/src/hugo
USER root
RUN cp /home/app/go/bin/hugo /usr/bin/hugo

RUN mkdir /home/app/repo
RUN chown app:app /home/app/repo

USER app
WORKDIR /home/app/repo
