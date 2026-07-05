from datetime import date
from typing import List, Literal, Optional

from pydantic import BaseModel

UpdateType = Literal[
    "Certification",
    "Product Idea",
    "Case Study",
    "Learning",
    "Article",
    "Release",
    "Event",
]


class UpdateItem(BaseModel):
    id: str
    title: str
    type: UpdateType
    date: date
    description: str
    tags: List[str] = []
    link: Optional[str] = None
