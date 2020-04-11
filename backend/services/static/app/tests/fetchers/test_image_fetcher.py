import os
from typing import Tuple

import pytest
from PIL import Image

from errors.InvalidPath import InvalidPath
from errors.InvalidResolution import InvalidResolution
from fetchers.ImageFetcher import ImageFetcher
from models.Resolution import ResolutionMaxDimension, ResolutionName
from samsite_flask import SamsiteFlask


@pytest.fixture(scope="function", name="image_fetcher")
def _image_fetcher() -> ImageFetcher:
    image_fetcher = ImageFetcher()
    return image_fetcher


class TemporaryImageFile:
    def __init__(self, path: str, size: Tuple[int, int] = (2000, 2000)) -> None:
        self.path = path
        self.size = size

    def __enter__(self) -> Image:
        image = Image.new("RGB", self.size)
        image.save(self.path)

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        os.remove(self.path)


class TestGetInternalPath:
    def test_append_store_path(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        app.STATIC_DIR = "./test"
        path = "path"

        assert image_fetcher.get_internal_path(path) == f"{app.STATIC_DIR}/{path}"

    def test_strip_leading_slash(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        app.STATIC_DIR = "./test"
        path = "path"

        assert image_fetcher.get_internal_path(f"/{path}") == f"{app.STATIC_DIR}/{path}"

    def test_strip_trailing_slash(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        app.STATIC_DIR = "./test"
        path = "path"

        assert image_fetcher.get_internal_path(f"{path}/") == f"{app.STATIC_DIR}/{path}"

    def test_strip_dir_navigation(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        app.STATIC_DIR = "./test"
        path = "path"

        assert (
            image_fetcher.get_internal_path(f"../../../{path}")
            == f"{app.STATIC_DIR}/{path}"
        )


class TestGetResolutionPath:
    def test_raw_path(self, image_fetcher: ImageFetcher) -> None:
        path = "path/image.jpg"

        assert image_fetcher.get_resolution_path(path, ResolutionName.RAW) == path

    def test_non_raw_path(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.HIGH
        path = "path/image.jpg"
        output_path = f"path/resized_images/image.{resolution.lower()}.jpg"

        assert image_fetcher.get_resolution_path(path, resolution) == output_path

    def test_invalid_path(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.HIGH
        path = "path"

        with pytest.raises(InvalidPath) as error:
            image_fetcher.get_resolution_path(path, resolution)

        assert error.value.message == "Invalid path to get resolution path from."


class TestResizeImage:
    path = "./path.jpg"
    resized_path = "./resized_path.jpg"

    @pytest.fixture(autouse=True)
    def clean_up(self) -> None:
        yield

        if os.path.exists(self.path):
            os.remove(self.path)
        if os.path.exists(self.resized_path):
            os.remove(self.resized_path)

    def test_invalid_path(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.HIGH

        with pytest.raises(InvalidPath) as error:
            image_fetcher.resize_image(self.path, self.resized_path, resolution)

        assert error.value.message == "Invalid image path."

    def test_invalid_resolution(self, image_fetcher: ImageFetcher) -> None:
        resolution = "test"

        with TemporaryImageFile(self.path):
            with pytest.raises(InvalidResolution) as error:
                image_fetcher.resize_image(self.path, self.resized_path, resolution)

        assert error.value.message == "Invalid resolution given."

    def test_resolution_greater_than_raw(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.LOW
        reduced_dimensions = (1, 1)

        with TemporaryImageFile(self.path, reduced_dimensions):
            image = image_fetcher.resize_image(self.path, self.resized_path, resolution)

        assert isinstance(image, Image.Image)
        assert image.size == reduced_dimensions
        assert not os.path.exists(self.resized_path)

    def test_resize(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.LOW
        max_dimension = getattr(ResolutionMaxDimension, resolution)
        raw_dimensions = (1000, 1000)

        with TemporaryImageFile(self.path, raw_dimensions):
            image = image_fetcher.resize_image(self.path, self.resized_path, resolution)

        assert isinstance(image, Image.Image)
        assert image.size == (max_dimension, max_dimension)
        assert os.path.exists(self.resized_path)
