#!/usr/bin/env bash

echo "port = ${VIRTUAL_PORT:-5432}" >> "$PGDATA/postgresql.conf"
echo "listen_addresses='*'" >> "$PGDATA/postgresql.conf"

export PGUSER="$POSTGRES_USER"
export PGPASSWORD="$POSTGRES_PASS"
export PGDATABASE="$POSTGRES_DBNAME"

"${psql[@]}" <<-EOSQL
	    CREATE DATABASE _test_$POSTGRES_DBNAME;
	    GRANT ALL PRIVILEGES ON DATABASE _test_$POSTGRES_DBNAME TO $POSTGRES_USER;
EOSQL
