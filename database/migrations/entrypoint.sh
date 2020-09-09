#!/usr/bin/env sh

set -o errexit -o pipefail -x

FLYWAY_COMMANDS="info migrate info"

echo "Running migrations"
flyway -configFiles=/migrations/flyway.conf -locations=filesystem://migrations/sql $FLYWAY_COMMANDS
