import os

from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_cors import CORS
from samsite_flask import SamsiteFlask
from samsite_sqlalchemy import create_database
from sqlalchemy.orm import sessionmaker

from models.base import SQLDeclarativeBase
from models.FrontpageStat import FrontpageStat
from stores.FrontpageStatStore import FrontpageStatStore


def create_app() -> SamsiteFlask:
    app = SamsiteFlask(__name__)

    app.config['SECRET_KEY'] = 'notsosecret'

    app.cors = CORS(app)

    app.db = create_database(
        dbname=os.environ["DB_NAME"],
        host=os.environ["DB_HOST"],
        password=os.environ["DB_PASSWORD"],
        port=os.environ["DB_PORT"],
        user=os.environ["DB_USER"],
    )
    app.session_maker = sessionmaker(app.db)

    app.frontpage_stat_store = FrontpageStatStore(session_maker=app.session_maker)

    SQLDeclarativeBase.metadata.create_all(app.db)

    app.config['FLASK_ADMIN_SWATCH'] = 'slate'
    admin = Admin(app, name='CMS Admin', template_mode='bootstrap3')
    admin.add_view(ModelView(model=FrontpageStat, session=app.session_maker()))

    return app


app = create_app()
