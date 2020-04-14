from typing import Callable, List, Optional, Union

from sqlalchemy.orm import Session

from models.FrontpageStat import FrontpageStat


class FrontpageStatStore:
    def __init__(self, session_maker: Callable[[], Session]):
        self.session_maker = session_maker

    def create_frontpage_stat(self, title: str, value: str, rank: int = 0) -> FrontpageStat:
        frontpage_stat = FrontpageStat(title=title, value=value, rank=rank)
        self.session_maker().add(frontpage_stat)
        return frontpage_stat

    def get_frontpage_stat(self, frontpage_stat_id: int) -> FrontpageStat:
        return self.session_maker().query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)

    def get_frontpage_stats(
            self,
            frontpage_stat_id: Optional[List[int]] = None,
            title: Optional[Union[str, List[str]]] = None,
    ) -> FrontpageStat:
        query = self.session_maker().query(FrontpageStat)

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
    ) -> FrontpageStat:
        session = self.session_maker()

        frontpage_stat = session.query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)

        if title is not None:
            frontpage_stat.title = title
        if value is not None:
            frontpage_stat.value = value
        if rank is not None:
            frontpage_stat.rank = rank

        session.commit()

        return frontpage_stat

    def delete_frontpage_stat(self, frontpage_stat_id: int) -> int:
        session = self.session_maker()

        frontpage_stat = session.query(FrontpageStat).filter(frontpage_stat_id=frontpage_stat_id)
        session.delete(frontpage_stat)

        return frontpage_stat_id
