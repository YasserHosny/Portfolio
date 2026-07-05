from typing import List

from app.data.seed import UPDATES
from app.schemas.update import UpdateItem


class UpdatesService:
    def list(self) -> List[UpdateItem]:
        items = [UpdateItem(**item) for item in UPDATES]
        return sorted(items, key=lambda u: u.date, reverse=True)


updates_service = UpdatesService()
