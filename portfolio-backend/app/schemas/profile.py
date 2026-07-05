from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class SnapshotItem(BaseModel):
    label: str
    value: str


class ExperienceEntry(BaseModel):
    company: str
    role: str
    period: str
    highlights: List[str]
    tags: List[str] = Field(default_factory=list)


class EducationEntry(BaseModel):
    institution: str
    degree: str
    period: str


class ContactLinks(BaseModel):
    linkedin: str
    email: EmailStr
    email_secondary: Optional[EmailStr] = None
    github: Optional[str] = None


class ProfileResponse(BaseModel):
    name: str
    brand: str
    title: str
    location: str
    positioning: List[str]
    hero_headline: str
    hero_subtitle: str
    supporting_line: str
    summary: str
    founder_summary: str
    snapshot: List[SnapshotItem]
    process_flow: List[str]
    experience: List[ExperienceEntry]
    education: List[EducationEntry]
    startup_value: List[str]
    contact: ContactLinks
