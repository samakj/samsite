import re

from flask import current_app

from errors.InvalidPath import InvalidPath
from models.Resolution import ResolutionValues


class ImageFetcher:
    @staticmethod
    def get_internal_path(path: str) -> str:
        clean_path = re.sub(r"\.\./", "", path).strip("/")

        return f"{current_app.STATIC_DIR}/{clean_path}"

    @staticmethod
    def get_resolution_path(path: str, resolution: str) -> str:
        if resolution is not ResolutionValues.RAW:
            path_split = path.split("/")

            if len(path_split) < 2:
                raise InvalidPath("Invalid path to get resolution path from.")

            path_split[-2] = f"{path_split[-2]}/resized_images"
            path_split[-1] = path_split[-1].replace(".", f".{resolution.lower()}.")
            path = "/".join(path_split)

        return path
