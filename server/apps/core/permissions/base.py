from rest_framework.permissions import BasePermission


class IsAdminOrProjectManager(BasePermission):
    """Baseline role check placeholder for privileged operations."""

    def has_permission(self, request, view):
        user = request.user
        role = getattr(user, "role", None)
        return bool(user and user.is_authenticated and role in {"admin", "project_manager"})
