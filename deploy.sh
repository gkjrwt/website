#!/bin/sh

ng build --prod &&\
  rm -rf ../nodearch.github.io/* &&\
  cp -rf dist/website/* ../nodearch.github.io/ &&\
  cp src/404.html ../nodearch.github.io/ &&\
  cp CNAME ../nodearch.github.io/