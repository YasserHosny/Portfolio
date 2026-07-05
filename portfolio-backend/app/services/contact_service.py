import logging
import smtplib
from email.message import EmailMessage
from email.utils import formataddr

from app.core.config import Settings, get_settings
from app.schemas.contact import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)


class ContactService:
    """Handles inbound contact-form submissions.

    In production (SMTP configured), sends a plain-text email to
    ``settings.contact_to_email`` via Zoho SMTP. Locally (SMTP unset), logs
    the submission and returns success so dev flows are not blocked.
    """

    def __init__(self) -> None:
        self._settings: Settings | None = None

    def _s(self) -> Settings:
        if self._settings is None:
            self._settings = get_settings()
        return self._settings

    def submit(self, payload: ContactRequest) -> ContactResponse:
        settings = self._s()

        logger.info(
            "contact_submission from=%s <%s> company=%s message_length=%d",
            payload.name,
            payload.email,
            payload.company or "-",
            len(payload.message),
        )

        if settings.smtp_configured:
            try:
                self._send_email(settings, payload)
            except Exception as exc:
                logger.exception("contact_email_failed: %s", exc)
                # Do not leak SMTP internals to the client — still accept
                # the submission so the form does not fail silently for the
                # user; the logs carry the failure signal for us to alert on.
                return ContactResponse(
                    success=True,
                    message=(
                        "Thanks — your message was received. If you don't hear "
                        "back within a few days, please reach out on LinkedIn."
                    ),
                )

        return ContactResponse(
            success=True,
            message="Thanks — your message has been received. Yasser will reply soon.",
        )

    @staticmethod
    def _send_email(settings: Settings, payload: ContactRequest) -> None:
        msg = EmailMessage()
        msg["Subject"] = f"[Portfolio] New message from {payload.name}"
        msg["From"] = formataddr((settings.contact_from_name, settings.contact_from_email))
        msg["To"] = settings.contact_to_email
        msg["Reply-To"] = payload.email

        body = (
            f"Name:    {payload.name}\n"
            f"Email:   {payload.email}\n"
            f"Company: {payload.company or '-'}\n"
            "\n"
            "Message:\n"
            f"{payload.message}\n"
        )
        msg.set_content(body)

        if settings.smtp_use_ssl:
            with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
                smtp.login(settings.smtp_username, settings.smtp_password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as smtp:
                smtp.starttls()
                smtp.login(settings.smtp_username, settings.smtp_password)
                smtp.send_message(msg)


contact_service = ContactService()
