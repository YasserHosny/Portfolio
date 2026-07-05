from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration, loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    app_name: str = "Yasser Hosny Portfolio API"
    app_env: str = "local"
    app_debug: bool = True
    app_host: str = "0.0.0.0"
    app_port: int = 8000

    # Stored as a plain comma-separated string so pydantic-settings v2 does
    # not try to JSON-decode the env value; parsed into a list via
    # `cors_origins_list` for use by CORSMiddleware.
    cors_origins: str = "http://localhost:4200,http://localhost:8080"

    # SMTP — contact form. When smtp_host is unset, ContactService falls back
    # to log-only (safe for local dev). In production, set all of these.
    smtp_host: str = ""
    smtp_port: int = 465
    smtp_use_ssl: bool = True
    smtp_username: str = ""
    smtp_password: str = ""
    contact_from_email: str = ""
    contact_from_name: str = "Yasser Hosny Portfolio"
    contact_to_email: str = ""

    # Rate limit for the public contact endpoint.
    contact_rate_limit: str = "5/hour"

    # Phase 2 placeholders — Supabase persistence.
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""

    @property
    def cors_origins_list(self) -> List[str]:
        return [item.strip() for item in self.cors_origins.split(",") if item.strip()]

    @property
    def smtp_configured(self) -> bool:
        return bool(
            self.smtp_host
            and self.smtp_username
            and self.smtp_password
            and self.contact_from_email
            and self.contact_to_email
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
