from typing import Generator

import pytest
from samsite_flask import SamsiteFlask
from samsite_sqlalchemy import create_database
from sqlalchemy.engine import Engine


@pytest.fixture(scope="function", name="engine")
def _engine(app: SamsiteFlask) -> Engine:
    return create_database(
        dbname=app.config["DB_NAME"],
        host=app.config["DB_HOST"],
        password=app.config["DB_PASSWORD"],
        port=app.config["DB_PORT"],
        user=app.config["DB_USER"],
    )


@pytest.fixture(scope="function", name="db")
def _db(engine: Engine) -> Generator[Engine, None, None]:
    connection = engine.connect()
    transaction = connection.begin()
    yield connection
    transaction.rollback()
    connection.close()
