import os

from flask_cors import CORS
from samsite_flask import SamsiteFlask
from samsite_sqlalchemy import create_database

from stores.locality_store import LocalityStore
from routes.v0.locality_routes import LOCALITIES_V0_BLUEPRINT


def create_app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)

    app.config['SECRET_KEY'] = 'notsosecret'

    app.cors = CORS(app)

    app.db = create_database(
        dbname=os.environ["DB_NAME"],
        host=os.environ["DB_HOST"],
        password=os.environ["DB_PASSWORD"],
        port=os.environ["DB_PORT"],
        user=os.environ["DB_USER"],
    )

    app.locality_store = LocalityStore(db=app.db)

    app.register_blueprint(LOCALITIES_V0_BLUEPRINT, url_prefix="/v0")

    return app


app = create_app()
