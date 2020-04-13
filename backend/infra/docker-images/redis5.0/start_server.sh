#!/usr/bin/env bash

if [ -z "$REDIS_PASSWORD" ]
then
    echo "No cache password set..."
else
    echo "Setting password on the redis cache..."
    echo "requirepass $REDIS_PASSWORD" >> /redis.conf
fi

redis-server /redis.conf --port ${VIRTUAL_PORT:-6379}
