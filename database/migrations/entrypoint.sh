#!/usr/bin/env sh

set -o errexit -o pipefail -x

FLYWAY_COMMANDS="info migrate info"

echo "Running migrations"
flyway -configFiles=database/migrations/flyway.conf -locations=filesystem://database/migrations/sql
