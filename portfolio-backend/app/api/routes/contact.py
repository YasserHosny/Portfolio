from fastapi import APIRouter, Depends, Request

from app.core.config import Settings, get_settings
from app.core.rate_limit import limiter
from app.schemas.contact import ContactRequest, ContactResponse
from app.services.contact_service import contact_service

router = APIRouter(tags=["contact"])


@router.post("/contact", response_model=ContactResponse)
@limiter.limit(lambda: get_settings().contact_rate_limit)
def submit_contact(
    request: Request,
    payload: ContactRequest,
    settings: Settings = Depends(get_settings),
) -> ContactResponse:
    return contact_service.submit(payload)
