from typing import List

from pydantic import BaseModel


class CapabilityGroup(BaseModel):
    group: str
    description: str
    items: List[str]


class CertificationItem(BaseModel):
    name: str
    theme: str


class CapabilitiesResponse(BaseModel):
    groups: List[CapabilityGroup]
    learning_themes: List[str]
    certifications: List[CertificationItem]
