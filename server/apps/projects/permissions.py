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

        # Check project membership
        membership = ProjectMembership.objects.filter(project=obj, user=user).first()
        if not membership:
            return False

        # Member Access (Read-only)
        if request.method in SAFE_METHODS:
            return True

        # Manager Access (Update)
        if membership.role == ProjectMembership.Role.MANAGER:
            # Managers cannot delete
            return request.method != "DELETE"

        # Owner Access (Full)
        if membership.role == ProjectMembership.Role.OWNER:
            return True

        # Regular members or others cannot modify
        return False
