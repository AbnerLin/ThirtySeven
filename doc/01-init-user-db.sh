#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER admin36 WITH PASSWORD 'admin36@DB';
    GRANT ALL PRIVILEGES ON DATABASE thirtyseven TO admin36;
EOSQL