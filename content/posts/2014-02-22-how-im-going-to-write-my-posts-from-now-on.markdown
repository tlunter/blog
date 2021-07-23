---
layout: post
title:  "How I'm going to write my posts from now on"
date:   2014-02-22 15:39:00
disqusId: /2014/02/22/how-im-going-to-write-my-posts-from-now-on
aliases: [/2014/02/22/how-im-going-to-write-my-posts-from-now-on]
---

Not sure how I found out about this tool, but I definitely enjoy writing here.  The call to action emails I kept getting actually made me come back.  I figured I'd check it out.  Below is my idle musings as I typed out whatever was currently willing to come out of my head on a Saturday night before being social.

>     # [Draft](https://draftin.com)
>
>     Ah, this might be where I actually start my posts.  A simple editor that shows almost no content.  Also, it saves relatively often.
>
>     It also appears to show markdown.  I wonder if I could tie this to the backend of my application so that I can post automatically from here.  That'd be a weird use of web technology.  Use someone else's beautiful editor to drive my simple blogging website.
>
>     I feel a lot more free with this editor.  I can definitely write easier.  It's not constrained by a white box with a black border.  I imagine myself kind of like Jack Nicholson in the Shining.  A blank piece of paper to type away in.  All I'm missing is the actual piece of paper moving side to side.

It seems like [Draft](https://draftin.com) has a very simple markdown parser and editing field.  I can definitely get by using this rather than making my own.

The only thing that would be more awesome, would be vim editing.  Something about editing in vim was always nice.  Unfortunately, having to backout to run a command and open an HTML file was getting annoying.  Also the weird word wrap.  I did write a small bash function, but even still, [Draft](https://draftin.com) is nicer.

    mdhtml() {
        file=$(echo $1 | sed -r "s/(.*).markdown/\1.html/g")
        markdown $1 > $file
        google-chrome-stable $file
    }

