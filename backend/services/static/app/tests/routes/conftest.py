import pytest
from unittest.mock import Mock

from flask.testing import FlaskClient
from samsite_flask import SamsiteFlask

from routes.v0.images import V0_IMAGES_BLUEPRINT


@pytest.fixture(scope="function", name="client", autouse=True)
def _client(app: SamsiteFlask, image_fetcher: Mock) -> FlaskClient:
    client = app.test_client()

    app.register_blueprint(V0_IMAGES_BLUEPRINT, url_prefix="/v0")

    return client
