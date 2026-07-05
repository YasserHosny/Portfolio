from fastapi import APIRouter

from app.schemas.profile import ProfileResponse
from app.services.profile_service import profile_service

router = APIRouter(tags=["profile"])


@router.get("/profile", response_model=ProfileResponse)
def get_profile() -> ProfileResponse:
    return profile_service.get_profile()
