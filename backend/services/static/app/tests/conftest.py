import pytest
from flask.testing import FlaskClient

from samsite_flask import SamsiteFlask


@pytest.fixture(scope="function", name="app")
def _app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)
    return app


@pytest.fixture(scope="function", name="client", autouse=True)
def _client(app: SamsiteFlask) -> FlaskClient:
    client = app.test_client()

    ctx = app.app_context()
    ctx.push()

    yield client

    ctx.pop()
