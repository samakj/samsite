from typing import Callable, List, Optional, Union

from sqlalchemy.orm import Session

from models.FrontpageStat import FrontpageStat
from stores.queries.frontpage_stats import BACKUP_FRONTPAGE_STATS, LOAD_FRONTPAGE_STATS_FROM_BACKUP


class FrontpageStatStore:
    def __init__(self, session_maker: Callable[[], Session]):
        self.session_maker = session_maker

    def create_frontpage_stat(self, title: str, value: str, rank: int = 0, session: Optional[Session] = None) -> FrontpageStat:
        session = session or self.session_maker()
        frontpage_stat = FrontpageStat(title=title, value=value, rank=rank)
        session.add(frontpage_stat)
        return frontpage_stat

    def get_frontpage_stat(self, frontpage_stat_id: int, session: Optional[Session] = None) -> FrontpageStat:
        session = session or self.session_maker()
        return session.query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)

    def get_frontpage_stats(
        self,
        frontpage_stat_id: Optional[List[int]] = None,
        title: Optional[Union[str, List[str]]] = None,
        session: Optional[Session] = None,
    ) -> FrontpageStat:
        session = session or self.session_maker()
        query = session.query(FrontpageStat)

        if frontpage_stat_id is not None:
            query.filter(FrontpageStat.frontpage_stat_id.any(frontpage_stat_id))
        if title is not None:
            if isinstance(title, list):
                query.filter(FrontpageStat.title.any(title))
            else:
                query.filter(FrontpageStat.title == title)

        return query.all()

    def update_frontpage_stat(
        self,
        frontpage_stat_id: int,
        title: Optional[str] = None,
        value: Optional[str] = None,
        rank: Optional[int] = None,
        session: Optional[Session] = None,
    ) -> FrontpageStat:
        session = session or self.session_maker()

        frontpage_stat = session.query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)

        if title is not None:
            frontpage_stat.title = title
        if value is not None:
            frontpage_stat.value = value
        if rank is not None:
            frontpage_stat.rank = rank

        session.commit()

        return frontpage_stat

    def delete_frontpage_stat(self, frontpage_stat_id: int, session: Optional[Session] = None) -> int:
        session = session or self.session_maker()

        frontpage_stat = session.query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)
        session.delete(frontpage_stat)

        return frontpage_stat_id

    def backup(self, session: Optional[Session] = None) -> None:
        session = session or self.session_maker()
        session.execute(BACKUP_FRONTPAGE_STATS)

    def load_from_backup(self, session: Optional[Session] = None) -> None:
        session = session or self.session_maker()
        session.execute(LOAD_FRONTPAGE_STATS_FROM_BACKUP)
