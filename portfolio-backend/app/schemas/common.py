from typing import Generic, List, Optional, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class HealthResponse(BaseModel):
    status: str
    service: str
    env: str


class ListResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int


class MessageResponse(BaseModel):
    message: str
    detail: Optional[str] = None
