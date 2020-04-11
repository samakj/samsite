from flask import Blueprint, Response, send_file
from PIL import Image
from samsite_flask.exceptions import APIError

from errors.InvalidPath import InvalidPath
from errors.InvalidResolution import InvalidResolution
from fetchers.ImageFetcher import ImageFetcher

V0_IMAGES_BLUEPRINT = Blueprint(__name__, "v0_images")


@V0_IMAGES_BLUEPRINT.route("/images/<path:image_path>/", methods=["GET"])
def get_image(image_path: str) -> Response:
    resolution = "RAW"
    path_split = image_path.rstrip("/").split("/")

    if "." not in path_split[-1]:
        resolution = path_split[-1].upper()
        path_split = path_split[:-1]

    try:
        image = ImageFetcher.fetch_image(path="/".join(path_split), resolution=resolution)
    except InvalidPath:
        raise APIError(404, "IMAGE_NOT_FOUND")
    except InvalidResolution:
        raise APIError(400, "BAD_RESOLUTION", {"resolution": resolution})

    return send_file(image.filename, mimetype=Image.MIME[image.format])
