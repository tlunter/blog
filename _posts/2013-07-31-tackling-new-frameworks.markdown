---
layout: post
title:  "Tackling new frameworks!"
date:   2013-07-31 23:57:00
---

# Introduction

Since I started my new job at Swipely, Inc., a Ruby-based startup using Rails as their main web application, I really wanted to delve into the Ruby atmosphere for this new project.  I figured I'd start simple rather than use the monstrosity that is Ruby on Rails, and picked Sinatra.  Since it's essentially a router and that's it, it was quick and easy to build a website like this.  In addition, I added a bit of JS by using AngularJS by Google to make some of the pages more fluid.

# Ruby
I knew I wanted to use Ruby, and I had seen sample Sinatra applications before, but I had never really attempted to work on one on my own.  Seeing as how Swipely also uses Ruby for non-web-based projects, This felt like a great way to familiarize myself with the language and also how to use it properly.  But, building a website using Sinatra for purely textual reasons seems pretty dumb and a serious waste of resources.  I decided to try and use a few different gems to expand the basic content of this site.

## Sequel and DataMapper
The first stop of my gem tour was database persistence.  I really wanted to drop records into a database, and be able to retrieve them later.  Simple with ActiveRecord and Rails, but at first I didn't know where to go.  I first tried out Sequel.  Sequel went... alriiiight.  The code didn't build the model, the database did.  Unfortunately, the code's model was to be completely empty.  This made it hard to be sure of how to refer to things in code, and what getters and setters would be available.  After very little time I switched to DataMapper.  DataMapper feels almost exactly like ActiveRecord.  Sure there are differences here and there, but for the most part it was really familiar.  With DataMapper, I was able to build models for Posts and Feed Items.  Using the property type Discriminator, I could easily subclass a FeedItem model for the multiple types of feeds, consolidating the data.  Now, having the datastore was good, but I needed a way to get data!

## DelayedJob, Resque and Clockwork
I'd heard a lot of talk about DelayedJob and Clockwork as a foolproof way of running jobs at specified time intervals.  Unfortunately, it seems like DelayedJob is really tied into Rails and is tough to decouple.  I figured I'd try it out anyways and kept running into weird failures.  Instead of waisting my time, I decided to persue other alleys.  Resque with Redis popped up.  Redis seems to be pretty hip, and crazy fast, so why not try it out!  There are free instances out there like RedisToGo, but I'd rather not rely on anyone else.  Since I'm using Arch, installing Redis is as simple as "sudo pacman -S redis".  Resque is a simple Ruby adapter for connecting to a Redis instance, and using that, I could drive Clockwork.  Now I could pull down my feeds periodically without needing to run cron jobs.  Basing the Clockwork file off of the main application, I could pull in the same DataMapper models I'd already built.

## Unicorn
Since I wanted the server to be a live instance, and not just running off of Thin or WEBrick, I installed Unicorn.  Unicorn with Nginx and a proxy_pass provide a full fledged server for extremely cheap.  It took almost nothing to build the Nginx configuration (since I've done that for many applications before) and Unicorn starts up with the option of a socket file by just the command line parameter.
 
## Foreman
Starting the server would've been a pain if I had to manage each process separately, but luckily someone else felt my pain.  Foreman is capable of using a Procfile to execute command line programs and assign a name to each.  Running Unicorn, Resque, and Clockwork became a single command and attaching that to systemd is simple enough as well.

# AngularJS
Since I was feeling pretty on the edge, I decided I'd try out a JS framework.  I'd heard a lot of good stuff about Angular and figured I'd give it a try.  The frontpage had me pretty excited, but I wasn't sure how well it would interface with an application like mine.  Using a JSON output from Sinatra, and an Angular frontend, I was able to provide seamless transitions between previous and next posts, and flip between different feeds.

Angular functions like an MVC framework for the frontend.  It's a bit of overhead just to get something simple like I was doing built, but once I had it all figured out, it felt worth it.  I had to add routes to the Sinatra app to forward the backend requests through to the frontend which allowed refresh the page.  Angular took care of the browser history adding the view changes to it (for some reason referred to as HTML5 mode).  Now I plan to add Markdown to the posts so that this post doesn't look absolutely terrible!  Stay tuned and hopefully I can roll that out!
