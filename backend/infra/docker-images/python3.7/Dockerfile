FROM python:3.7-alpine
RUN apk add build-base
RUN apk add bash
RUN apk add curl
RUN apk add postgresql-dev

RUN mkdir /app
COPY ./libs /libs
COPY ./tooling /tooling

ENV PYTHONPATH=/app:/libs
WORKDIR /app
VOLUME /app
VOLUME /libs