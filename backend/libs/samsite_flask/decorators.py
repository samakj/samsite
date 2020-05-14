import socket
from functools import wraps
from typing import Callable, Optional, Set

from flask import request

from samsite_flask.exceptions import APIError


def whitelist(
    ips: Optional[Set[str]] = None,
    internal: bool = True,
) -> Callable:
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args, **kwargs) -> Optional[Callable]:
            _ips = ips or set()

            if internal:
                host_ip = socket.gethostbyname(socket.gethostname())
                _ips.add("172.21.0.1" if host_ip.startswith("172.") else host_ip)

            if request.remote_addr not in _ips:
                raise APIError(403, "FORBIDDEN")

            return func(*args, **kwargs)
        return wrapper
    return decorator
