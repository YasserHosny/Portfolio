from app.data.seed import CAPABILITY_GROUPS, CERTIFICATIONS, LEARNING_THEMES
from app.schemas.capability import (
    CapabilitiesResponse,
    CapabilityGroup,
    CertificationItem,
)


class CapabilitiesService:
    def get(self) -> CapabilitiesResponse:
        return CapabilitiesResponse(
            groups=[CapabilityGroup(**g) for g in CAPABILITY_GROUPS],
            learning_themes=list(LEARNING_THEMES),
            certifications=[CertificationItem(**c) for c in CERTIFICATIONS],
        )


capabilities_service = CapabilitiesService()
