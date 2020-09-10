#!/usr/bin/env sh

set -o errexit -o pipefail -x

FLYWAY_COMMANDS="info migrate info"

echo "Running migrations"
flyway -locations=filesystem://database/migrations/sql -X migrate
