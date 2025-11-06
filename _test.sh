#!/bin/bash

[[ -z $1 ]] && VERSION=3.10 || VERSION=$1
[[ -d venv-$VERSION ]] || ./_setup.sh $VERSION
source venv-$VERSION/bin/activate
jupyter-book build .
