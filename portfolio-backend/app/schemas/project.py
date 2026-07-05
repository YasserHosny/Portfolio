from datetime import date
from typing import List, Optional

from pydantic import BaseModel


class Project(BaseModel):
    slug: str
    name: str
    description: Optional[str] = None
    language: str
    tags: List[str] = []
    repo_url: str
    homepage_url: Optional[str] = None
    last_push: date
    highlight: bool = False
    linked_product_lab_slug: Optional[str] = None
