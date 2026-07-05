from typing import List, Optional

from app.data.seed import PRODUCT_LAB
from app.schemas.product_lab import ProductLabItem


class ProductLabService:
    def list(self) -> List[ProductLabItem]:
        return [ProductLabItem(**item) for item in PRODUCT_LAB]

    def get(self, slug: str) -> Optional[ProductLabItem]:
        for item in PRODUCT_LAB:
            if item["slug"] == slug:
                return ProductLabItem(**item)
        return None


product_lab_service = ProductLabService()
