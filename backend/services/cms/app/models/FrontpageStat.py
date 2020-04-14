from sqlalchemy import Column, desc, Integer, String, UniqueConstraint

from models.base import SQLDeclarativeBase


class FrontpageStat(SQLDeclarativeBase):
    __tablename__ = "frontpage_stats"

    frontpage_stat_id = Column(Integer, primary_key=True)
    title = Column(String)
    value = Column(String)
    rank = Column(Integer, default=0)

    __table_args__ = (UniqueConstraint("title", "value", name="title_value_unique"),)
    __mapper_args__ = {
        "order_by": desc(rank),
    }
