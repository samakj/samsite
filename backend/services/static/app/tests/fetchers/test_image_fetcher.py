import os
from typing import Tuple
from unittest.mock import Mock

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

        return Image.open(self.path)

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        os.remove(self.path)


class TestGetInternalPath:
    path = "path"

    @pytest.fixture(autouse=True)
    def set_static_dir(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = "./test"
        yield

    def test_append_store_path(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        assert image_fetcher.get_internal_path(self.path) == f"{app.STATIC_DIR}/{self.path}"

    def test_strip_leading_slash(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        assert image_fetcher.get_internal_path(f"/{self.path}") == f"{app.STATIC_DIR}/{self.path}"

    def test_strip_trailing_slash(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        assert image_fetcher.get_internal_path(f"{self.path}/") == f"{app.STATIC_DIR}/{self.path}"

    def test_strip_dir_navigation(
        self, app: SamsiteFlask, image_fetcher: ImageFetcher
    ) -> None:
        assert (
            image_fetcher.get_internal_path(f"../../../{self.path}")
            == f"{app.STATIC_DIR}/{self.path}"
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

        assert error.value.message == f"Invalid image path: '{path}'"


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

        assert error.value.message == f"Invalid image path: '{self.path}'"

    def test_invalid_resolution(self, image_fetcher: ImageFetcher) -> None:
        resolution = "test"

        with TemporaryImageFile(self.path):
            with pytest.raises(InvalidResolution) as error:
                image_fetcher.resize_image(self.path, self.resized_path, resolution)

        assert error.value.message == f"Invalid resolution: '{resolution}'"

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


class TestFetchImage:
    path = "./path.jpg"
    resized_path = "./resized_path.jpg"

    @pytest.fixture(scope="function", name="image_fetcher")
    def _image_fetcher(self) -> ImageFetcher:
        image_fetcher = ImageFetcher()

        ImageFetcher.get_internal_path = Mock()
        ImageFetcher.get_internal_path.return_value = self.path

        ImageFetcher.get_resolution_path = Mock()
        ImageFetcher.get_resolution_path.return_value = self.resized_path

        ImageFetcher.resize_image = Mock()

        return image_fetcher

    @pytest.fixture(autouse=True)
    def clean_up(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = ""

        yield

        if os.path.exists(self.path):
            os.remove(self.path)
        if os.path.exists(self.resized_path):
            os.remove(self.resized_path)

    def test_invalid_path(self, image_fetcher: ImageFetcher) -> None:
        with pytest.raises(InvalidPath) as error:
            image_fetcher.fetch_image(self.path)

        assert error.value.message == f"Invalid image path: '{self.path}'"

    def test_get_internal_path_call(self, image_fetcher: ImageFetcher) -> None:
        with TemporaryImageFile(self.resized_path) as resized_image:
            ImageFetcher.resize_image.return_value = resized_image
            with TemporaryImageFile(self.path):
                image_fetcher.fetch_image(self.path)

        image_fetcher.get_internal_path.assert_called_once_with(path=self.path)

    def test_get_resolution_path_call(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.HIGH

        with TemporaryImageFile(self.resized_path) as resized_image:
            ImageFetcher.resize_image.return_value = resized_image
            with TemporaryImageFile(self.path):
                image_fetcher.fetch_image(self.path, resolution)

        image_fetcher.get_resolution_path.assert_called_once_with(path=self.path, resolution=resolution)

    def test_resize_image_call(self, image_fetcher: ImageFetcher) -> None:
        resolution = ResolutionName.HIGH

        with TemporaryImageFile(self.path):
            image_fetcher.fetch_image(self.path, resolution)

        image_fetcher.resize_image.assert_called_once_with(
            raw_path=self.path,
            resized_path=self.resized_path,
            resolution=resolution,
        )

    def test_fetch_raw_resolution(self, image_fetcher: ImageFetcher) -> None:
        ImageFetcher.get_resolution_path.return_value = self.path

        with TemporaryImageFile(self.path) as raw_image:
            image = image_fetcher.fetch_image(self.path)

        assert image.size == raw_image.size
        assert image.filename == raw_image.filename
        assert not ImageFetcher.resize_image.called

    def test_fetch_existing_resize(self, image_fetcher: ImageFetcher) -> None:
        with TemporaryImageFile(self.resized_path) as resized_image:
            with TemporaryImageFile(self.path):
                image = image_fetcher.fetch_image(self.path, ResolutionName.HIGH)

        assert image.size == resized_image.size
        assert image.filename == resized_image.filename
        assert not ImageFetcher.resize_image.called

    def test_fetch_non_existing_resize(self, image_fetcher: ImageFetcher) -> None:
        ImageFetcher.get_resolution_path.return_value = "./test.png"

        with TemporaryImageFile(self.resized_path) as resized_image:
            ImageFetcher.resize_image.return_value = resized_image
            with TemporaryImageFile(self.path):
                image = image_fetcher.fetch_image(self.path, ResolutionName.HIGH)

        assert image == resized_image
