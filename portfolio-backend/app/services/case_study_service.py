from typing import List, Optional

from app.data.seed import CASE_STUDIES
from app.schemas.case_study import CaseStudy


class CaseStudyService:
    def list(self) -> List[CaseStudy]:
        return [CaseStudy(**item) for item in CASE_STUDIES]

    def get(self, slug: str) -> Optional[CaseStudy]:
        for item in CASE_STUDIES:
            if item["slug"] == slug:
                return CaseStudy(**item)
        return None


case_study_service = CaseStudyService()
