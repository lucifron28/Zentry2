import logging

logger = logging.getLogger(__name__)


def log_audit_event(*, action, actor_id=None, details=None):
    """Minimal audit logging helper to standardize event shape."""

    logger.info(
        "audit_event",
        extra={
            "action": action,
            "actor_id": actor_id,
            "details": details or {},
        },
    )
