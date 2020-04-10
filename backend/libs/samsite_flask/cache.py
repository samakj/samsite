from typing import Any, Dict, Optional

from flask_caching import Cache

from . import SamsiteFlask


class SamsiteCache(Cache):
    def __init__(self, app: Optional[SamsiteFlask] = None, config: Optional[Dict[str, Any]] = None):
        super(SamsiteCache, self).__init__(app, config=config)

    def get(
        self, key: str, key_formatting_kwargs: Optional[Dict[str, Any]] = None
    ) -> Optional[Any]:
        formatted_key = (
            key.format(**key_formatting_kwargs) if key_formatting_kwargs is not None else key
        )
        value = super(SamsiteCache, self).get(key=formatted_key)
        return value

    def set(
        self,
        key: str,
        value: Any,
        timeout: int,
        key_formatting_kwargs: Optional[Dict[str, Any]] = None,
    ) -> None:
        formatted_key = (
            key.format(**key_formatting_kwargs) if key_formatting_kwargs is not None else key
        )
        super(SamsiteCache, self).set(key=formatted_key, value=value, timeout=timeout)