FROM ubuntu:18.04

# Install system dependencies
RUN apt-get -y update && apt-get -y install build-essential zlib1g-dev libssl-dev libreadline6-dev libyaml-dev curl wget git python nginx ruby ruby-dev nodejs imagemagick libmagickwand-dev
RUN curl -L https://www.npmjs.com/install.sh | sh
RUN useradd -ms /bin/bash app
RUN gem install bundler

RUN mkdir -p /opt/tlunter/blog
RUN chown -R app:app /opt/tlunter/blog

USER app

WORKDIR /opt/tlunter/blog

ADD Gemfile /opt/tlunter/blog/Gemfile
ADD Gemfile.lock /opt/tlunter/blog/Gemfile.lock
RUN bundle install --deployment

ADD package.json /opt/tlunter/blog/package.json
RUN npm install

RUN npm install bower
ADD bower.json /opt/tlunter/blog/bower.json
RUN node_modules/.bin/bower install

ADD . /opt/tlunter/blog
RUN node_modules/.bin/gulp jekyllRebuild

USER root
CMD ["nginx","-g","daemon off;","-c","/opt/tlunter/blog/nginx.conf"]
