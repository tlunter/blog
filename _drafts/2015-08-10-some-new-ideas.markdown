---
layout: post
title:  "Some new ideas"
date:   2015-08-10 12:50:00
---

Been recently working on a few ideas.

## [Rocker](https://github.com/tlunter/rocker)

For the past two years Docker has been the big thing in devops.  At Swipely, we use it from local development all the way to production.  To remove any reliance on the CLI, we wrote a wrapper around the remote API: [docker-api](https://github.com/swipely/docker-api). We've benefited greatly from docker-api and use it in [dockly](https://github.com/swipely/dockly) and other private projects.

With Docker 1.8 just on the horizon, support is being added to copy files into a container.  With that, the Dockerfile build tool is no longer reliant on the engine and can be abstracted out to a separate tool.

Rocker is a Ruby image builder that looks a lot like the Dockerfile build tool.  Currently it supports only a few commands, but adding the remaining Dockerfile commands is much simpler.  My plan is to support parellel `RUN`ing, and superior caching including pulling in previous caches and rerunning a command.  Rocker will share a lot in common with Dockerfile, with just a few niceties that I find extremely helpful.

## [App Deployer](https://github.com/tlunter/app-deployer)

Now, I really just don't have a good name for this project yet.  I've started working on something similar to [aerosol](https://github.com/swipely/aerosol) for container deployment.  Using a similar setup to fig, I hope to support bring up containers on a remote cluster of instances or locally.  By updating a remote or local nginx upstream file, it'll redirect requests from an old web app to a new web app.  After reloading nginx, it'll take down the old containers.  I'm trying to remove the logic required to map a container port to a specific host port by updating the load balancer with the correct port after the fact.  It might even be possible to load balancer TCP instead of only HTTP with nginx as well.

This one is very much in the early stages, but the DSL work is already done.

# Otherwise

Besides these two projects, I've had a couple other things I've been working on.

## [Amtrak Status](http://amtrak.tlunter.com)

Along with my daily commute from Back Bay to Providence comes the annoyance of catching the train.  While Amtrak is usually on time, some days it could be more than 45 minutes late.  Enter Amtrak Status.

Originally just a hubot plugin, hubot would reply with train listing after scraping Amtrak's status page when asked: `hubot amtrak from pvd to bby`.  This helped immensely at the end of the day when you were itching to head home.  But... you had to ask.  We just wanted to *know*.

Having written an OSX System Bar application previously, I built an application that would poll the status page every minute, giving you up to the minute timings for all trains, always visible from the system bar.  A few updates later and we added the time to the top bar next to the icon.  Up to the minute train times.  Woo!

Until Amtrak's status page changes...

Since everyones application was scraping Amtrak's status page independently, if the layout changed then everyones application needed to be updated.  Instead of dealing with this hassle, I wrote a gem: [amtrak](https://github.com/tlunter/amtrak_gem).  The gem is powering a website: [amtrak endpoint](https://github.com/tlunter/amtrak_endpoint).  Now if the layout changes, a few quick changes to the endpoint and everyones happy. No more relying on updates.

And for fun, I wrote an Android application around the endpoint: [Amtrak Status](https://play.google.com/store/apps/details?id=com.tlunter.amtrak).  It's not the prettiest right now, but I'm hoping to get an update out soon that supports push notifications when your train is late which is paired with some UI updates.  Maybe someday I'll get a real icon too!
