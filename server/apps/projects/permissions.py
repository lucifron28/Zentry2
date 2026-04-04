from rest_framework.permissions import SAFE_METHODS, BasePermission


class ProjectsAccessPermission(BasePermission):
    """Allow read access and require authentication for non-read actions."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        if getattr(view, "action", None) in {"members", "remove_member"}:
            return bool(obj.owner_id == user.id or getattr(user, "role", None) == "admin")

        return True
