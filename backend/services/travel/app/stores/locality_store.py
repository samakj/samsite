from decimal import Decimal
from typing import List, Optional, Set, Union

from sqlalchemy import text
from sqlalchemy.engine import Engine

from models.locality_model import Locality
from stores.queries.locality_queries import (
    CREATE_LOCALITY_QUERY,
    DELETE_LOCALITY_QUERY,
    GET_LOCALITY_QUERY_TEMPLATE,
    GET_LOCALITIES_QUERY_TEMPLATE,
    UPDATE_LOCALITY_QUERY,
    BACKUP_LOCALITIES,
    LOAD_LOCALITIES_FROM_BACKUP,
)

ALL_FIELDS = {"locality_id", "name", "country_code", "latitude", "longitude", "gmaps_place_id"}


class LocalityStore:
    def __init__(self, db: Engine):
        self.db = db

    def create_locality(
        self,
        name: str,
        country_code: str,
        latitude: Decimal,
        longitude: Decimal,
        gmaps_place_id: Optional[str] = None,
    ) -> Locality:
        db_response = self.db.execute(
            text(CREATE_LOCALITY_QUERY),
            name=name,
            country_code=country_code,
            latitude=latitude,
            longitude=longitude,
            gmaps_place_id=gmaps_place_id,
        ).fetchone()

        return Locality(
            locality_id=db_response["locality_id"],
            name=db_response["name"],
            country_code=db_response["country_code"],
            latitude=db_response["latitude"],
            longitude=db_response["longitude"],
            gmaps_place_id=db_response["gmaps_place_id"],
        )

    def get_locality(
        self,
        locality_id: int,
        fields: Optional[Set[str]] = None,
    ) -> Optional[Locality]:
        db_response = self.db.execute(
            text(
                GET_LOCALITY_QUERY_TEMPLATE.format(
                    fields=", ".join((fields or ALL_FIELDS) & ALL_FIELDS)
                )
            ),
            locality_id=locality_id,
        ).fetchone()

        return Locality(**dict(db_response)) if db_response else None

    def get_localities(
        self,
        fields: Optional[Set[str]] = None,
        locality_id: Optional[Union[Set[int], int]] = None,
        name: Optional[Union[Set[str], str]] = None,
        country_code: Optional[Union[Set[str], str]] = None,
        order_by: Optional[str] = None,
        order_by_direction: Optional[str] = None,
    ) -> List[Locality]:
        where_conditions: Set[str] = set()

        if locality_id:
            where_conditions.add(
                f"locality_id = "
                f"{'ANY(:locality_id)' if isinstance(locality_id, set) else ':locality_id'}"
            )
        if name:
            where_conditions.add(
                f"name = "
                f"{'ANY(:name)' if isinstance(name, set) else ':name'}"
            )
        if country_code:
            where_conditions.add(
                f"country_code = "
                f"{'ANY(:country_code)' if isinstance(country_code, set) else ':country_code'}"
            )

        db_response = self.db.execute(
            text(
                GET_LOCALITIES_QUERY_TEMPLATE.format(
                    fields=", ".join((fields or ALL_FIELDS) & ALL_FIELDS),
                    where_conditions=" AND ".join(where_conditions) if where_conditions else "TRUE",
                    order_by_condition=(
                        f"{order_by if order_by in ALL_FIELDS else 'locality_id'} "
                        f"{order_by_direction if order_by_direction in {'ASC', 'DESC'} else 'ASC'}"
                    ),
                ),
            ),
            locality_id=list(locality_id) if isinstance(locality_id, set) else locality_id,
            name=list(name) if isinstance(name, set) else name,
            country_code=list(country_code) if isinstance(country_code, set) else country_code,
        )

        return [Locality(**dict(row)) for row in db_response]

    def update_locality(
        self,
        locality_id: int,
        name: Optional[str] = None,
        country_code: Optional[str] = None,
        latitude: Optional[Decimal] = None,
        longitude: Optional[Decimal] = None,
        gmaps_place_id: Optional[str] = None,
    ) -> Optional[Locality]:
        set_conditions: Set[str] = set()

        if name:
            set_conditions.add("name = :name")
        if country_code:
            set_conditions.add("country_code = :country_code")
        if latitude:
            set_conditions.add("latitude = :latitude")
        if longitude:
            set_conditions.add("longitude = :longitude")
        if gmaps_place_id:
            set_conditions.add("gmaps_place_id = :gmaps_place_id")

        if not set_conditions:
            return self.get_locality(locality_id=locality_id)

        db_response = self.db.execute(
            text(UPDATE_LOCALITY_QUERY.format(set_conditions=", ".join(set_conditions))),
            locality_id=locality_id,
            name=name,
            country_code=country_code,
            latitude=latitude,
            longitude=longitude,
            gmaps_place_id=gmaps_place_id,
        ).fetchone()

        return Locality(
            locality_id=db_response["locality_id"],
            name=db_response["name"],
            country_code=db_response["country_code"],
            latitude=db_response["latitude"],
            longitude=db_response["longitude"],
            gmaps_place_id=db_response["gmaps_place_id"],
        ) if db_response else None

    def delete_locality(self, locality_id: int) -> Optional[int]:
        db_response = self.db.execute(
            text(DELETE_LOCALITY_QUERY),
            locality_id=locality_id,
        ).scalar()

        return db_response

    def backup_localities(self) -> bool:
        self.db.execute(BACKUP_LOCALITIES)
        return True

    def load_localities_from_backup(self) -> bool:
        self.db.execute(LOAD_LOCALITIES_FROM_BACKUP)
        return True
