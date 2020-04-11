import os
import pytest
from unittest.mock import Mock

from flask.testing import FlaskClient
from PIL import Image

from errors.InvalidPath import InvalidPathError
from errors.InvalidResolution import InvalidResolutionError
from fetchers.ImageFetcher import ImageFetcher


class TestGetImage:
    route = "v0/images/"
    filename = "to.jpg"

    @pytest.fixture(scope="function", name="image_fetcher")
    def _image_fetcher(self) -> ImageFetcher:
        image_fetcher = ImageFetcher()

        ImageFetcher.fetch_image = Mock()

        image = Image.new('RGB', (1, 1))
        image.save(f"/{self.filename}")

        ImageFetcher.fetch_image.return_value = Image.open(f"/{self.filename}")

        yield image_fetcher

        os.remove(f"/{self.filename}")

    def test_fetch_image_raw_call(self, client: FlaskClient, image_fetcher: Mock) -> None:
        client.get(f"{self.route}{self.filename}/")

        image_fetcher.fetch_image.assert_called_once_with(path=self.filename, resolution="RAW")

    def test_fetch_image_with_resolution_call(self, client: FlaskClient, image_fetcher: Mock) -> None:
        resolution = "high"
        client.get(f"{self.route}{self.filename}/{resolution}/")

        image_fetcher.fetch_image.assert_called_once_with(path=self.filename, resolution=resolution.upper())

    def test_image_not_found(self, client: FlaskClient) -> None:
        ImageFetcher.fetch_image.side_effect = InvalidPathError('')

        response = client.get(f"{self.route}{self.filename}/")
        response_data = response.get_json()

        assert response.status_code == 404
        assert response_data["status_code"] == 404
        assert response_data["error_type"] == "IMAGE_NOT_FOUND"

    def test_bad_resolution(self, client: FlaskClient) -> None:
        resolution = "test"
        ImageFetcher.fetch_image.side_effect = InvalidResolutionError('')

        response = client.get(f"{self.route}{self.filename}/{resolution}/")
        response_data = response.get_json()

        assert response.status_code == 400
        assert response_data["status_code"] == 400
        assert response_data["error_type"] == "BAD_RESOLUTION"
        assert response_data["resolution"] == resolution.upper()

    def test_response(self, client: FlaskClient) -> None:
        response = client.get(f"{self.route}{self.filename}/")

        assert response.status_code == 200
        assert response.headers['Content-Type'] == 'image/jpeg'

