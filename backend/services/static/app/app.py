from flask_cors import CORS

from cache import cache
from samsite_flask import SamsiteFlask

from routes.v0.images import V0_IMAGES_BLUEPRINT


def create_app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)
    app.cors = CORS(app)

    cache.init_app(app=app)

    app.STATIC_DIR = "./store"
    app.register_blueprint(V0_IMAGES_BLUEPRINT, url_prefix="/v0")

    return app


app = create_app()
