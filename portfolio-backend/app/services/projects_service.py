from typing import List

from app.data.seed import PROJECTS
from app.schemas.project import Project


class ProjectsService:
    def list(self) -> List[Project]:
        items = [Project(**p) for p in PROJECTS]
        return sorted(items, key=lambda p: (not p.highlight, -p.last_push.toordinal()))


projects_service = ProjectsService()
