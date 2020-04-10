import os

from samsite_flask.cache import SamsiteCache

cache = SamsiteCache(
    config={
        "CACHE_TYPE": "redis",
        "CACHE_REDIS_HOST": os.environ["CACHE_HOST"],
        "CACHE_REDIS_PORT": os.environ["CACHE_PORT"],
        "CACHE_REDIS_PASSWORD": os.environ["CACHE_PASSWORD"],
    }
)
