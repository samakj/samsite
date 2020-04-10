import re
from flask import current_app


def create_internal_path(path: str) -> str:
    clean_path = re.sub(r"\.\./", "", path).strip("/")

    return f"{current_app.STATIC_DIR}/{clean_path}"
