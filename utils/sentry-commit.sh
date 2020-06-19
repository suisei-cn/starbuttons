#!/bin/bash

REV=$(sentry-cli releases propose-version)
sentry-cli releases set-commits --auto $REV
sentry-cli releases deploys $REV new -e PROD