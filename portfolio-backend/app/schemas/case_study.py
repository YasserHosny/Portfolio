from typing import List

from pydantic import BaseModel


class CaseStudy(BaseModel):
    slug: str
    title: str
    problem: str
    role: str
    solution: str
    business_impact: str
    tags: List[str]
