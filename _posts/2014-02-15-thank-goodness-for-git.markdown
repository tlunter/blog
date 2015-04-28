---
layout: post
title:  "Thank goodness for Git"
date:   2014-02-15 14:34:00
---

# How I Backup

Everyone at some point or another has had a hard drive fail on them.  Usually, someone can get the data off sticking it in a SATA dock and mounting the drive on another computer.  Other times the platters are grinding against the read/write head and there's just no hope left.  With the first scare there usually isn't that much worry.  It won't happen again, right?

I, unfortunately, have the worst luck with hard drives, having to send back at least one a year.  I run two or three computers constantly.  Some friends of mine, on the other hand, have never had a hard drive die on them during the life of their computer.

I've setup my main desktop hard drives to be RAIDed, but that doesn't always protect you.  For media, I'm not too worried about trying to keep a consistent backup.  For small files I use a git repository.

On my laptop, media server and desktop are all versions of my repository.  A decentralized backup.  I constantly pull down the latest on each of these machines whenever I happen to be doing work (often), and am not too worried about a failing hard drive.  I've had the repository for a few years now, and it actually is getting to be quite large (a few gigabytes), but at least I have the backup!  Storage is cheap so I'm not too worried, and running on N or wired usually means I can get the repository fast enough.

# The Original Story

I have a 60 GB SSD in my desktop for a couple of years and decided I wanted to upgrade so I could actually use the space for games.  I swapped out my laptops hard drive with the SSD.  The slot on my laptop (ThinkPad T430) is 7mm tall and this drive was much too tall, so I actually installed it in my disk drive slot.

The drive was already old to begin with and SSD are still prone to failure after too many read/writes.  I recently opened a shell and my file system was strangely set to read-only.  When I went to shut down, my computer complained like crazy and essentially said, "no".  When I tried to reboot, nothing was happening.  Popped in my Live USB, and even chrooting into my system was a no-go.  After inspecting the mounted filesystem, nearly all my main Linux executables were there, just 0 bytes in size.  Clearly my SSD had started failing.  SMART status told me the SSD life was long gone.

Being stubborn, I used pacman outside a chroot, redirected where my pacman database was, and reinstalled most of the base utilities that were damaged.  After an hour of work my computer was good as new and I went about my business as usual.

# The New Story

Fast forward a couple months, and I'm sitting at my desk, open my laptop, and bam.  Same thing as last time.  Read-only file system.  At first, I was afraid since this is my main computer for all my development.  I was nervous, but then realized all my work was backed up elsewhere.  I had all my personal files on at least two other systems, and all of my work git repositories were pushed and up to date.  Not having to worry about my data made working on the system much easier.  I wasn't really too concerned I was going to possibly lose all my data by booting my computer.

I immediately go straight to my Live USB after attempting a shutdown which again failed, and start inspecting the file system.  I can't immediately see anything wrong, and running `pacman -Qkk` is pretty good about telling you about broken files.  Everything seemed OK though.  I rebooted back into my main OS and all seemed to working just fine.

I was definitely lucky this time around, or just haven't found the section of the file system I'm missing.  I do run a relatively lightweight system and only use about 20 GB in total on this laptop.  Still, I went on Amazon, found a 7mm 128 GB SSD and am awaiting it's arrival.  I am still using the computer for now, but hope to have a reinstall really soon.

# Perks of the new drive

When I bought this computer, it was at a strange time.  Windows 8 was just starting to get pushed, and Lenovo was on their game about providing updated systems.  The T430 had the option of coming with Windows 7 or Windows 8.  I opted for Windows 7 since I was more familiar.  When the system came, I figured it was just an older model missing things like Secure Boot and support for GPT.

Apparently I was wrong.  Right in the BIOS settings, Secure Boot is just set to off.  I figure this time around I'll flip it on and see how much harder it is to install Arch.  Hopefully it's not too bad and I can get up and running pretty smoothly.  Having things like dotfiles for most of my personal configuration means my window management will be setup pretty quickly.  Also, any packages that I installed and left orphaned instead of removing will be gone.  It's always an exciting time getting to reinstall Linux.
