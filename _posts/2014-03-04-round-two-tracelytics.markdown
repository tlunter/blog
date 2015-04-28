---
layout: post
title:  "Round Two: Tracelytics"
date:   2014-03-04 00:58:00
---

Since I hadn't really finished what I was working on last night, and it's currently Northeastern's Spring Break, I decided to keep going.

# Round Two: Nginx

So, when compiling nginx, I was having an issue with the linking of `RAND_pseudo_bytes@OPENSSL_1.0.0`.  After searching the internet, and figuring out the idea behind versioned symbols, I stumbled across a guy that added these versioned symbols to an older version of OpenSSL.  For whatever reason, I needed to hand compiled OpenSSL with these symbols.  So, I pulled down the PKGBUILD for Arch's OpenSSL, and went to work patching it.  The patch file is:

    diff -rupN openssl-1.0.1e.orig/Configure openssl-1.0.1e/Configure
    --- openssl-1.0.1e.orig/Configure   2014-03-03 23:15:34.986680578 -0500
    +++ openssl-1.0.1e/Configure        2014-03-03 23:20:44.973347560 -0500
    @@ -1576,6 +1576,8 @@ if ($strict_warnings)
                }
        }
     
    +$shared_ldflag .= " -Wl,--version-script=openssl.ld";
    +
     open(IN,'<Makefile.org') || die "unable to read Makefile.org:$!\n";
     unlink("$Makefile.new") || die "unable to remove old $Makefile.new:$!\n" if -e "$Makefile.new";
     open(OUT,">$Makefile.new") || die "unable to create $Makefile.new:$!\n";
    diff -rupN openssl-1.0.1e.orig/engines/openssl.ld openssl-1.0.1e/engines/openssl.ld
    --- openssl-1.0.1e.orig/engines/openssl.ld  1969-12-31 19:00:00.000000000 -0500
    +++ openssl-1.0.1e/engines/openssl.ld       2014-03-03 23:21:52.033347630 -0500
    @@ -0,0 +1,4 @@
    +OPENSSL_1.0.0 {
    +    global:
    +        *;
    +};
    diff -rupN openssl-1.0.1e.orig/Makefile openssl-1.0.1e/Makefile
    --- openssl-1.0.1e.orig/Makefile    2014-03-03 23:15:34.960013911 -0500
    +++ openssl-1.0.1e/Makefile 2014-03-03 23:21:28.420014272 -0500
    @@ -174,9 +174,9 @@ WDIRS=  windows
     LIBS=   libcrypto.a libssl.a
     SHARED_CRYPTO=libcrypto$(SHLIB_EXT)
     SHARED_SSL=libssl$(SHLIB_EXT)
    -SHARED_LIBS=
    -SHARED_LIBS_LINK_EXTS=
    -SHARED_LDFLAGS=
    +SHARED_LIBS=$(SHARED_CRYPTO) $(SHARED_SSL)
    +SHARED_LIBS_LINK_EXTS=.so.$(SHLIB_MAJOR) .so
    +SHARED_LDFLAGS=-m64 -Wl,--version-script=openssl.ld
     
     GENERAL=        Makefile
     BASENAME=       openssl
    diff -rupN openssl-1.0.1e.orig/openssl.ld openssl-1.0.1e/openssl.ld
    --- openssl-1.0.1e.orig/openssl.ld  1969-12-31 19:00:00.000000000 -0500
    +++ openssl-1.0.1e/openssl.ld       2014-03-03 23:21:59.190014303 -0500
    @@ -0,0 +1,4 @@
    +OPENSSL_1.0.0 {
    +    global:
    +        *;
    +};

From what I can tell is, this takes all functions and versions them as OPENSSL_1.0.0, as well.

Seeing as how this is a very generic patch, I hope it will work for quite a bit.

Since this worked just fine, I installed the resulting package, and then running `make` for nginx ran smoothly.

# Now what?

Now to try and figure out just went wrong with Ruby!

