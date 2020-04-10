from samsite_flask import SamsiteFlask

from fetchers.ImageFetcher import create_internal_path


class TestCreateInternalPath:
    def test_append_store_path(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        with app.app_context():
            assert create_internal_path(path) == f"{app.STATIC_DIR}/{path}"

    def test_strip_leading_slash(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        with app.app_context():
            assert create_internal_path(f"/{path}") == f"{app.STATIC_DIR}/{path}"

    def test_strip_trailing_slash(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        with app.app_context():
            assert create_internal_path(f"{path}/") == f"{app.STATIC_DIR}/{path}"

    def test_strip_dir_navigation(self, app: SamsiteFlask) -> None:
        app.STATIC_DIR = './test'
        path = 'path'

        with app.app_context():
            assert create_internal_path(f"../../../{path}") == f"{app.STATIC_DIR}/{path}"
