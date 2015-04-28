---
layout: post
title:  "Markdown, my favorite formatting syntax"
date:   2013-07-31 23:57:00
---

# In the beginning

When I first heard about markdown, I was just joining StackOverflow trying to ask and answer some questions, get badges and see how much reputation I could bring in.  Markdown syntax was provided for the regular posts (not comments as much), but I couldn't really get the hang of it right away.  I eventually read the documentation a few times and picked up on the necessary things like code blocks, inline code blocks and headers.

Since then, I've been using GitHub more often, editting READMEs, and writing articles and posts in markdown.  Recognizing how to use markdown was quite a bit like learning how to write for a Wiki.  Wiki's have their own sort of BBCode (for those of the early 2000's that frequented bulletin boards) that feels a little convoluted after a while.  Markdown took that, and flipped it upside down.

# Why Markdown

The styling is simple because there is not much to style.  Lately, minimalist language construction has been growing (Ruby's syntax versus Python, Haskell vs the world).  I've begun to love Markdown.  I write all my posts on this blog in Markdown.  I've written school papers in Markdown .  You can format it using a command line utility to HTML, or any other sort of rich text format.  Markdown just works for everything I need.

Some might combat Markdown with the fact that word processors give you the ability for drawing graphics right in the program.  I say, leave the drawing to the drawing programs and styling to the styling programs.  Markdown can embed images the way I need to.  I haven't completely ditched word processors, but I haven't been opening mine too often either.  Whenever I want to write a new post, I either bring up my new post page or open up VIm (preferred).  My text editor has built in syntax highlighting for .md files and lets me write what I want to write without worrying about making sure all my fonts are the same size.  I feel like Markdown streams my writing, and leaves the visual cruft for when the product is complete.

# What I use

## Red Carpet

Red Carpet is a ruby gem that is stupid simple to use to render from Markdown to HTML in your Ruby program.  I'm not too sure what else is out there for other languages, but if there isn't already a Haskell-Parsec Markdown parser, then someone is bound to make one soon.  Being able to drop Markdown support into a web application for styling takes the work off your hands to write a syntax and parse it.  Also, defining some really simple CSS allows for easily written, pretty text blobs.

## Markdown by John Gruber

If you want to use markdown as a command line tool, John Gruber (the creator of Markdown?) has a simple tool that takes a Markdown file and spits HTML out to standard out.  Your language may not support Markdown natively, but since it definitely supports system commands, you're all set to just call the process with that file.  You might want to be cautious about what you just through into a system prompt, especially if you're trusting someones input for say a filename or something, but if you really can't find anything, this is always an option.
