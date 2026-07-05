from typing import List, Optional

from pydantic import BaseModel


class ProductLabItem(BaseModel):
    slug: str
    title: str
    description: str
    problem: str
    target_users: str
    mvp_scope: List[str]
    status: str
    tags: List[str]
    detail_url: Optional[str] = None
