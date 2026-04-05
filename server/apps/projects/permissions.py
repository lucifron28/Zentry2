from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import User
from .models import ProjectMembership


class ProjectsAccessPermission(BasePermission):
    """Role-aware access for project endpoints based on project membership."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Global entry check: allow creation and safe list/retrieve for authenticated users
        # Direct object access is checked in has_object_permission
        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Admin override
        if getattr(user, "role", None) == User.Role.ADMIN:
            return True

        # Owner Access (Full)
        if obj.owner_id == user.id:
            return True

        # Member Access (Read-only)
        if request.method in SAFE_METHODS:
            return obj.members.filter(pk=user.id).exists()

        # Regular members or others cannot modify
        return False
