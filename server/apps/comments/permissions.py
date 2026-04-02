from rest_framework.permissions import SAFE_METHODS, BasePermission


class CommentsAccessPermission(BasePermission):
    """Allow read access and require authentication for non-read actions."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)
