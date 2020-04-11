import pytest
from flask.testing import FlaskClient
from unittest.mock import Mock

from PIL import Image
from samsite_flask import SamsiteFlask

from fetchers.ImageFetcher import ImageFetcher


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


@pytest.fixture(scope="function", name="image_fetcher")
def _image_fetcher() -> Mock:
    image_fetcher = Mock(spec_set=ImageFetcher)

    ImageFetcher.get_internal_path.return_value = './path.jpg'
    ImageFetcher.get_resolution_path.return_value = './resized_path.jpg'
    ImageFetcher.resize_image.return_value = Image.new('RGB', (1, 1))
    ImageFetcher.fetch_image.return_value = Image.new('RGB', (1, 1))

    return image_fetcher
