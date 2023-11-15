#!/bin/bash

[[ -z $1 ]] && VERSION=3.10 || VERSION=$1

source venv-$VERSION/bin/activate
jupyter-book build .
