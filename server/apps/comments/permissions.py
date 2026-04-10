from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.users.models import User
from apps.projects.models import ProjectMembership


class CommentsAccessPermission(BasePermission):
    """Project-scoped comment permissions.

    - Any project member can create and read comments on tasks within their projects.
    - Only the comment author (or Admin) can update or delete a comment.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Admin override
        if getattr(user, "role", None) == User.Role.ADMIN:
            return True

        project = obj.task.project
        if project is None:
            return False

        # Must be a member of the task's parent project
        is_member = ProjectMembership.objects.filter(
            project=project, user=user
        ).exists()

        if not is_member:
            return False

        # Read access — any project member
        if request.method in SAFE_METHODS:
            return True

        # Write access (update/delete) — author only
        return obj.author_id == user.id
