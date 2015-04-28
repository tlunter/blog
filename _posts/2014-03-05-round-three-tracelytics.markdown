---
layout: post
title:  "Round Three: Tracelytics"
date:   2014-03-05 00:58:00
---

Holy cow!  Welcome back for round three.  I finally got nginx working and that was pretty, but I really wanted Ruby/Rack to also be recording some traces.  Well, it's happening!

![nginx and Rack traces](https://i.imgur.com/kO1vYH1.png)

When I looked into the gem source, lib/oboe.rb:25 was giving me the issue.  This line contains

    unless $ENV['RAILS_GROUP'] == 'assets'

Now, for whatever reason, they were using `$ENV` instead of `ENV`.  I can't fathom why that is, but the reason I was getting there was accidental itself.  When I first installed the gem with

    gem install oboe

the C extensions weren't built, and

    require 'oboe_metal.so'

was failing. Reinstalling fixed the missing C extensions. I finally got it working!

