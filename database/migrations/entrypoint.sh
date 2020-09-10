#!/usr/bin/env sh

set -o errexit -o pipefail -x

FLYWAY_COMMANDS="info migrate info"

echo "Flyway url: $FLYWAY_URL"
echo "Running migrations"
flyway -configFiles=database/migrations/flyway.conf -locations=filesystem://migrations/sql $FLYWAY_COMMANDS
