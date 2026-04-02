class AuditContextMixin:
    """Reusable helper to provide request context for audit logging."""

    def build_audit_context(self, request):
        return {
            "user_id": getattr(request.user, "id", None),
            "path": request.path,
            "method": request.method,
        }
