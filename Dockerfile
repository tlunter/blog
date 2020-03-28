FROM ubuntu:20.04
ENV DEBIAN_FRONTEND="noninteractive"
RUN apt-get update && apt-get install -y golang-go git
RUN ln -fs /usr/share/zoneinfo/America/New_York /etc/localtime
RUN dpkg-reconfigure --frontend noninteractive tzdata

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
