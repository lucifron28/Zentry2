from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import User


class TasksAccessPermission(BasePermission):
    """Role-aware access for task endpoints."""

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

        if role == User.Role.ADMIN:
            return True

        return role == User.Role.PROJECT_MANAGER

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        role = getattr(user, "role", None)
        if role == User.Role.ADMIN:
            return True

        project = obj.project
        if project is None:
            return False

        has_project_access = bool(project.owner_id == user.id or project.members.filter(pk=user.id).exists())

        if request.method in SAFE_METHODS:
            return has_project_access

        return bool(role == User.Role.PROJECT_MANAGER and has_project_access)
