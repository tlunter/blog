FROM ubuntu:20.04
RUN apt-get update && apt-get install -y git curl build-essential

RUN curl -L https://golang.org/dl/go1.16.6.linux-amd64.tar.gz | tar -xz -C /usr/local
ENV PATH="$PATH:/usr/local/go/bin"

RUN useradd -d /home/app app && mkdir -p /home/app && chown app:app /home/app
USER app
RUN mkdir -p /home/app/src
WORKDIR /home/app/src

RUN git clone https://github.com/gohugoio/hugo.git
WORKDIR /home/app/src/hugo
RUN go install --tags extended
USER root
RUN cp /home/app/go/bin/hugo /usr/bin/hugo

RUN mkdir /home/app/repo
RUN chown app:app /home/app/repo

USER app
WORKDIR /home/app/repo
