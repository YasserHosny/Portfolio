from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(..., min_length=10, max_length=4000)


class ContactResponse(BaseModel):
    success: bool
    message: str
