from flask_cors import CORS

from cache import cache
from samsite_flask import SamsiteFlask


def create_app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)
    app.cors = CORS(app)

    cache.init_app(app=app)

    app.STATIC_DIR = "./store"

    return app


app = create_app()
