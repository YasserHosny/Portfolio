from fastapi import APIRouter, HTTPException

from app.schemas.common import ListResponse
from app.schemas.product_lab import ProductLabItem
from app.services.product_lab_service import product_lab_service

router = APIRouter(tags=["product-lab"], prefix="/product-lab")


@router.get("", response_model=ListResponse[ProductLabItem])
def list_product_lab() -> ListResponse[ProductLabItem]:
    items = product_lab_service.list()
    return ListResponse[ProductLabItem](items=items, total=len(items))


@router.get("/{slug}", response_model=ProductLabItem)
def get_product_lab(slug: str) -> ProductLabItem:
    item = product_lab_service.get(slug)
    if item is None:
        raise HTTPException(status_code=404, detail=f"Product lab item '{slug}' not found")
    return item
