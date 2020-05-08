from dataclasses import dataclass
from decimal import Decimal
from typing import Optional


@dataclass
class Locality:
    locality_id: Optional[int] = None
    name: Optional[str] = None
    country_code: Optional[str] = None
    latitude: Optional[Decimal] = None
    longitude: Optional[Decimal] = None
    gmaps_place_id: Optional[str] = None
