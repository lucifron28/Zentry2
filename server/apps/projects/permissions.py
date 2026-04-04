from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import User


class ProjectsAccessPermission(BasePermission):
    """Role-aware access for project endpoints."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        role = getattr(user, "role", None)
        if request.method in SAFE_METHODS:
            return role in {
                User.Role.ADMIN,
                User.Role.PROJECT_MANAGER,
                User.Role.TEAM_MEMBER,
            }

        if getattr(view, "action", None) == "create":
            return role in {User.Role.ADMIN, User.Role.PROJECT_MANAGER}

        return role in {User.Role.ADMIN, User.Role.PROJECT_MANAGER}

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        role = getattr(user, "role", None)
        if role == User.Role.ADMIN:
            return True

        is_project_member = bool(obj.owner_id == user.id or obj.members.filter(pk=user.id).exists())

        if request.method in SAFE_METHODS:
            return is_project_member

        if role == User.Role.PROJECT_MANAGER:
            return bool(obj.owner_id == user.id)

        return False
