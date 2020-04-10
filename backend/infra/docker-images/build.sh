#!/usr/bin/env bash

cd "${PWD/\/backend\/*//backend}"


docker rmi samsite-postgres:latest
docker rmi samsite-python:latest
docker rmi samsite-redis:latest

docker build ./infra/docker-images/postgres12.0/ --tag samsite-postgres:latest
docker build . -f ./infra/docker-images/python3.7/Dockerfile --tag samsite-python:latest
docker build ./infra/docker-images/redis5.0/ --tag samsite-redis:latest
