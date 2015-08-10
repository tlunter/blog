FROM ubuntu:14.04

# Install system dependencies
RUN apt-get -y update
RUN apt-get -y install build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev wget git python nginx

# Install ruby and node
WORKDIR /tmp/

RUN wget -q -O /tmp/ruby-2.2.2.tar.gz http://cache.ruby-lang.org/pub/ruby/2.2/ruby-2.2.2.tar.gz && \
    tar -xvf ruby-2.2.2.tar.gz         && \
    cd /tmp/ruby-2.2.2/                && \
    ./configure --disable-install-rdoc && \
    make -j 4                          && \
    make -j 4 install                  && \
    cd /                               && \
    rm -rf /tmp/ruby-2.2.2 /tmp/ruby-2.2.2.tar.gz
RUN gem install bundler

RUN wget -q -O /tmp/node-v0.10.29.tar.gz https://nodejs.org/dist/v0.10.29/node-v0.10.29.tar.gz && \
    tar -xvf node-v0.10.29.tar.gz       && \
    cd /tmp/node-v0.10.29/              && \
    ./configure                        && \
    make                               && \
    make install                       && \
    cd /                               && \
    rm -rf /tmp/node-v0.10.29 /tmp/node-v0.10.29.tar.gz

ENV GEM_HOME=/root/.gem
ENV PATH=$PATH:/root/.gem/bin
RUN gem install jekyll -v 3.0.0.pre.beta8

WORKDIR /
ADD . /opt/tlunter/blog

WORKDIR /opt/tlunter/blog
RUN npm install
RUN npm install bower
RUN node_modules/.bin/bower install --allow-root
RUN node_modules/.bin/gulp jekyll-rebuild

CMD nginx -g 'daemon off;' -c /opt/tlunter/blog/nginx.conf
