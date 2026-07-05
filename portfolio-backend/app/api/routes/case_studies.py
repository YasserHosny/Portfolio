from fastapi import APIRouter, HTTPException

from app.schemas.case_study import CaseStudy
from app.schemas.common import ListResponse
from app.services.case_study_service import case_study_service

router = APIRouter(tags=["case-studies"], prefix="/case-studies")


@router.get("", response_model=ListResponse[CaseStudy])
def list_case_studies() -> ListResponse[CaseStudy]:
    items = case_study_service.list()
    return ListResponse[CaseStudy](items=items, total=len(items))


@router.get("/{slug}", response_model=CaseStudy)
def get_case_study(slug: str) -> CaseStudy:
    item = case_study_service.get(slug)
    if item is None:
        raise HTTPException(status_code=404, detail=f"Case study '{slug}' not found")
    return item
