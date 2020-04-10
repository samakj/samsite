import pytest
from flask.testing import FlaskClient

from samsite_flask import SamsiteFlask


@pytest.fixture(scope="function", name="app")
def _app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)
    return app


@pytest.fixture(scope="function", name="client")
def _client(app: SamsiteFlask) -> FlaskClient:
    return app.test_client()
