#!/bin/bash
set -ev

docker run -it  -v $(pwd):/project -w /project python:3.10 ./_test.sh
