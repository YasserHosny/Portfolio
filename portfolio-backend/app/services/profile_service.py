from app.data.seed import PROFILE
from app.schemas.profile import ProfileResponse


class ProfileService:
    """Reads Yasser's public profile.

    TODO(Phase 2): swap the seed data source for a Supabase-backed repository.
    """

    def get_profile(self) -> ProfileResponse:
        return ProfileResponse(**PROFILE)


profile_service = ProfileService()
