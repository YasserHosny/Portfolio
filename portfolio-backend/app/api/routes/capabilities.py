from fastapi import APIRouter

from app.schemas.capability import CapabilitiesResponse
from app.services.capabilities_service import capabilities_service

router = APIRouter(tags=["capabilities"])


@router.get("/capabilities", response_model=CapabilitiesResponse)
def get_capabilities() -> CapabilitiesResponse:
    return capabilities_service.get()
