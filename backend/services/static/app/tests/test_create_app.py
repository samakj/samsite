from samsite_flask import SamsiteFlask
from app import create_app


def test_create_app_return() -> None:
    assert isinstance(create_app(), SamsiteFlask)
