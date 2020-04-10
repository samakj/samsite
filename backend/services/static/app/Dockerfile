FROM aislet-python:latest

COPY ./ /app
VOLUME /app

RUN apk add jpeg-dev zlib-dev
RUN pip install -r requirements.txt

EXPOSE ${VIRTUAL_PORT}

CMD ["bash", "/app/run.sh"]