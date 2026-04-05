from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import User
from apps.projects.models import ProjectMembership


class TasksAccessPermission(BasePermission):
    """Role-aware access for task endpoints based on project membership roles."""

    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Access is primarily checked at the object level or scoped via queryset
        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Admin override
        if getattr(user, "role", None) == User.Role.ADMIN:
            return True

        project = obj.project
        if project is None:
            return False

        # Parent Project Owner or Manager Access (Full)
        membership = ProjectMembership.objects.filter(project=project, user=user).first()
        if membership and membership.role in {ProjectMembership.Role.OWNER, ProjectMembership.Role.MANAGER}:
            return True

        # Parent Project Member Access (Read-only)
        if request.method in SAFE_METHODS:
            return project.members.filter(pk=user.id).exists()

        # Regular members are read-only for now
        return False
