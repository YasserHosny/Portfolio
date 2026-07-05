from fastapi import APIRouter

from app.schemas.common import ListResponse
from app.schemas.update import UpdateItem
from app.services.updates_service import updates_service

router = APIRouter(tags=["updates"])


@router.get("/updates", response_model=ListResponse[UpdateItem])
def list_updates() -> ListResponse[UpdateItem]:
    items = updates_service.list()
    return ListResponse[UpdateItem](items=items, total=len(items))
