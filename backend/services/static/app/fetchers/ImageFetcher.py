import os
import re

from flask import current_app
from PIL import Image

from errors.InvalidPath import InvalidPath
from errors.InvalidResolution import InvalidResolution
from models.Resolution import ResolutionMaxDimension, ResolutionName


class ImageFetcher:
    @staticmethod
    def get_internal_path(path: str) -> str:
        clean_path = re.sub(r"\.\./", "", path).strip("/")

        return f"{current_app.STATIC_DIR}/{clean_path}"

    @staticmethod
    def get_resolution_path(path: str, resolution: str) -> str:
        if resolution is not ResolutionName.RAW:
            path_split = path.split("/")

            if len(path_split) < 2:
                raise InvalidPath("Invalid path to get resolution path from.")

            path_split[-2] = f"{path_split[-2]}/resized_images"
            path_split[-1] = path_split[-1].replace(".", f".{resolution.lower()}.")
            path = "/".join(path_split)

        return path

    @staticmethod
    def resize_image(raw_path: str, resized_path: str, resolution: str) -> Image:
        try:
            image = Image.open(raw_path)
        except IOError:
            raise InvalidPath("Invalid image path.")

        try:
            max_dimension = getattr(ResolutionMaxDimension, resolution)
        except AttributeError:
            raise InvalidResolution("Invalid resolution given.")

        resize_ratio = min(max_dimension / image.width, max_dimension / image.height)

        if resize_ratio < 1:
            image.thumbnail(
                size=(int(image.width * resize_ratio), int(image.height * resize_ratio)),
                resample=Image.ANTIALIAS,
            )

            resized_folder = "/".join(resized_path.split("/")[:-1])

            if not os.path.exists(resized_folder):
                os.makedirs(resized_folder)

            image.save(resized_path, image.format)
            image = Image.open(resized_path)

        return image
