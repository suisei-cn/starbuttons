#!/bin/bash
set -e

REV=$(sentry-cli releases propose-version)
node_modules/.bin/sentry-cli releases set-commits --auto $REV
node_modules/.bin/sentry-cli releases deploys $REV new -e PROD
