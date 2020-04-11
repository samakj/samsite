import pytest

from flask.testing import FlaskClient
from samsite_flask import SamsiteFlask

from errors.InvalidPath import InvalidPath
from fetchers.ImageFetcher import ImageFetcher
from models.Resolution import ResolutionValues


@pytest.fixture(scope="function", name="image_fetcher")
def _image_fetcher(client: FlaskClient) -> ImageFetcher:
    image_fetcher = ImageFetcher()
    return image_fetcher


class TestGetInternalPath:
    def test_append_store_path(self, app: SamsiteFlask, image_fetcher: ImageFetcher) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        assert image_fetcher.get_internal_path(path) == f"{app.STATIC_DIR}/{path}"

    def test_strip_leading_slash(self, app: SamsiteFlask, image_fetcher: ImageFetcher) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        assert image_fetcher.get_internal_path(f"/{path}") == f"{app.STATIC_DIR}/{path}"

    def test_strip_trailing_slash(self, app: SamsiteFlask, image_fetcher: ImageFetcher) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        assert image_fetcher.get_internal_path(f"{path}/") == f"{app.STATIC_DIR}/{path}"

    def test_strip_dir_navigation(self, app: SamsiteFlask, image_fetcher: ImageFetcher) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        assert image_fetcher.get_internal_path(f"../../../{path}") == f"{app.STATIC_DIR}/{path}"


class TestGetResolutionPath:
    def test_raw_path(self, image_fetcher: ImageFetcher) -> None:
        path = 'path/image.jpg'

        assert image_fetcher.get_resolution_path(path, ResolutionValues.RAW) == path

    def test_non_raw_path(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionValues.HIGH
        path = 'path/image.jpg'
        output_path = f'path/resized_images/image.{resolution.lower()}.jpg'

        assert image_fetcher.get_resolution_path(path, resolution) == output_path

    def test_invalid_path(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionValues.HIGH
        path = 'path'

        with pytest.raises(InvalidPath) as error:
            image_fetcher.get_resolution_path(path, resolution)

        assert error.value.message == 'Invalid path to get resolution path from.'
