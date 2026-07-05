"""Rate-limit primitives for public endpoints."""
from slowapi import Limiter
from slowapi.util import get_remote_address

# Global limiter — keyed by the caller's IP.
# Behind a reverse proxy (nginx / Bunny), remote_addr is the last hop; we set
# X-Forwarded-For in nginx so slowapi picks up the real client IP.
limiter = Limiter(key_func=get_remote_address)
