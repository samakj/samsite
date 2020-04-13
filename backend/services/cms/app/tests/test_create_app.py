from app import create_app
from samsite_flask import SamsiteFlask


def test_create_app_return() -> None:
    assert isinstance(create_app(), SamsiteFlask)
