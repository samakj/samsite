import pytest
from flask.testing import FlaskClient

from samsite_flask import SamsiteFlask


@pytest.fixture(scope="function", name="app")
def _app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)

    ctx = app.app_context()
    ctx.push()

    yield app

    ctx.pop()


@pytest.fixture(scope="function", name="client", autouse=True)
def _client(app: SamsiteFlask) -> FlaskClient:
    client = app.test_client()

    return client
