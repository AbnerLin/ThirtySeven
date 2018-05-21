FROM postgres:9.6.1-alpine

COPY ./doc/01-init-user-db.sh /docker-entrypoint-initdb.d
COPY ./doc/backup.sql /docker-entrypoint-initdb.d
