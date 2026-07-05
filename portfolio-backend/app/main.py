import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

from app.api.routes import (
    capabilities,
    case_studies,
    contact,
    health,
    product_lab,
    profile,
    projects,
    updates,
)
from app.core.config import get_settings
from app.core.rate_limit import limiter

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("portfolio.api")


def create_app() -> FastAPI:
    settings = get_settings()

    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        docs_url="/api/docs",
        redoc_url="/api/redoc",
        openapi_url="/api/openapi.json",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins_list,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Rate limiter — wired here so tests can override the limiter's storage
    # or the per-endpoint limit through settings.
    app.state.limiter = limiter
    app.add_middleware(SlowAPIMiddleware)

    @app.exception_handler(RateLimitExceeded)
    async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
        return JSONResponse(
            status_code=429,
            content={"message": "Too many requests. Please try again later."},
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception("Unhandled error on %s: %s", request.url.path, exc)
        return JSONResponse(
            status_code=500,
            content={"message": "Internal server error"},
        )

    api_prefix = "/api"
    app.include_router(health.router, prefix=api_prefix)
    app.include_router(profile.router, prefix=api_prefix)
    app.include_router(product_lab.router, prefix=api_prefix)
    app.include_router(case_studies.router, prefix=api_prefix)
    app.include_router(updates.router, prefix=api_prefix)
    app.include_router(capabilities.router, prefix=api_prefix)
    app.include_router(projects.router, prefix=api_prefix)
    app.include_router(contact.router, prefix=api_prefix)

    return app


app = create_app()
