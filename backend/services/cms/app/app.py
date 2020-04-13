import os

from flask_cors import CORS
from samsite_flask import SamsiteFlask
from samsite_sqlalchemy import create_database


def create_app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)
    app.cors = CORS(app)

    app.db = create_database(
        dbname=os.environ["DB_NAME"],
        host=os.environ["DB_HOST"],
        password=os.environ["DB_PASSWORD"],
        port=os.environ["DB_PORT"],
        user=os.environ["DB_USER"],
    )

    return app


app = create_app()
