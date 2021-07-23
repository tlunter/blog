---
layout: post
title:  "Sound Jacks in Linux"
date:   2014-04-04 20:23:00
disqusId: /2014/04/04/sound-jacks-in-linux
aliases: [/2014/04/04/sound-jacks-in-linux]
---

On my desktop computer, I have a set of headphones with a microphone plugged in, and a set of speakers for when I want to watch something or listen to music and know I won't disturb anyone.

Most computers only come with two if not one audio out 3.5mm jack.
Other than that, you have all forms of line-in, microphone and optical audio.
My headphones, which make audiophiles ears bleed they're so awful, are plugged into the standard Line-Out and Microphone ports, but I don't want to have to swap wires all the time and I'd really like to use my speakers occasionally.

# Windows

In Windows, Realtek's audio driver and software are awesome and give a simple interface to redirect a jack from input to output.
Double click the jack, change the functionality, instantly working.

# Linux

In Linux, things aren't so easy.
All I want to do is swap the input port for an output port.
If this was so easy in Windows, why not just as simple in Linux?
The first problem, which took longer than I'd like to admit, was trying to find the right program.

## Program name?

When talking about the holes in the back of the computers where plugs are put in, I usually use the word "port".
Instead, the program uses the word "jack".
That was definitely the first problem.
I had opened up Xchat, connected to FreeNode, joined #pulseaudio, asked my question and in return was told to use `hda-jack-retask`.
Simple enough name, but just different enough from `swap audio source` and search terms like it.

## Local PulseAudio config?

After starting up the program, I found out Ubuntu uses a `$HOME/.pulse` folder, instead of the Arch folder `$HOME/.config/pulse`.
Figured I'd just symlink `.pulse` to `.config/pulse`, right?
The program really didn't like the symlink, so moving some folders around, symlinking in the other direction, we got everyone happy.

![Just hit apply](https://i.imgur.com/K9HGupK.png)

## Apply settings?

After reading online, the program is as simple as overriding the port for a different functionality.
I'm using the `Blue Line In, Rear side` jack, and just needed to swap this for a `Line out` and hit `Apply now`.

![Blue, you're my boy!](https://i.imgur.com/1jsCLue.png)

When hitting `Apply now`, it told me that it had "success".

![Sweet success?](https://i.imgur.com/ym3FEXX.png)

I took that for granted the first few times, but after noticing that pulseaudio was just getting killed to no benefit, I knew I had to poke around the code.
Since the code is open source at [launchpad](https://code.launchpad.net/~diwic/+junk/hda-jack-retask), I started poking around `apply-changes.c`.
The program places a script in `/tmp/hda-jack-retask-XXXXXX`, and somehow attempts to run it with `gksudo`.
Don't have that executable, so that definitely isn't going to run.
Removing all the previously run hda-jack-retask folders, and retrying leaves me with a `script.sh` that I should be able to run with `sudo`, and fix my audio problems.

## Round one of trying script

It doesn't error out, but as soon I try and open alsamixer and look at my audio outputs, alsamixer crashes.
Looks like something is broken.

I notice that I set the `Blue Line In, Rear side` to `Line out (Back)`, but this is already taken by `Black Line Out, Rear side` which I don't even have, or isn't visible?

![](https://i.imgur.com/6IOr7OC.png)

If I set `Black Line Out, Rear side` to `Not Connected`, and the `Blue Line In, Rear side` to `Line out (Back)`, I should have success.

![](https://i.imgur.com/DVYy17h.png)

## Round two of trying script

Script doesn't error out again, and this time audio from my speakers!

The taste of success is sweet.
