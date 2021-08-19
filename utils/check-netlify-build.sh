#!/bin/bash

# Return 1 to build and 0 to skip.

if [ "$PULL_REQUEST" == "true" ]; then
  exit 1
fi

if [[ "$BRANCH" =~ ^split\/ ]]; then
  exit 1
fi
