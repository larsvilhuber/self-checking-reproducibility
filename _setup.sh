#!/bin/bash

# This will initialize the Python environment needed for testing.
[[ -z $1 ]] && VERSION=3.12 || VERSION=$1
python$VERSION -m venv venv-$VERSION
source venv-$VERSION/bin/activate
pip$VERSION install -r requirements.txt

