#!/usr/bin/env bash

set -o nounset
set -o errexit
set -o pipefail

current_function="$1"
current_build="${current_function}_${DEPLOY_ENVIRONMENT}"
cd ../$current_function

if [ -f package-lock.json ]; then
    npm ci
else