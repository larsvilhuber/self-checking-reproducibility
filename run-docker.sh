#!/bin/bash
set -ev

[ -z $1 ] && script="./_test.sh" || script=$1

docker run -it  -v $(pwd):/project -w /project python:3.10 $script
