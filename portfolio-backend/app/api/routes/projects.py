from fastapi import APIRouter

from app.schemas.common import ListResponse
from app.schemas.project import Project
from app.services.projects_service import projects_service

router = APIRouter(tags=["projects"])


@router.get("/projects", response_model=ListResponse[Project])
def list_projects() -> ListResponse[Project]:
    items = projects_service.list()
    return ListResponse[Project](items=items, total=len(items))
