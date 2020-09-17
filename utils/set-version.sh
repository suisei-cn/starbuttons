#!/bin/bash

REV=$(node_modules/.bin/sentry-cli releases propose-version)
sed -i "s/NULL_RELEASE/$REV/" src/main.ts
