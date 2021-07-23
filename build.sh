#!/bin/bash
docker images --format "{{.Repository}}:{{.Tag}}" | grep "blog:build" >/dev/null || docker build --tag blog:build .
docker run --publish 1313:1313 --volume `pwd`:/home/app/repo -it blog:build bash -l
