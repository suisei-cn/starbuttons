#!/bin/bash
set -e

REV=$(node_modules/.bin/sentry-cli releases propose-version)
node_modules/.bin/sentry-cli releases set-commits --auto $GITHUB_SHA
node_modules/.bin/sentry-cli releases deploys $GITHUB_SHA new -e PROD
