from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied, ValidationError

from apps.users.models import User
from apps.projects.models import ProjectMembership
from .models import TaskComment
from .serializers import TaskCommentSerializer, TaskCommentCreateSerializer
from .permissions import CommentsAccessPermission


class TaskCommentViewSet(viewsets.ModelViewSet):
    """CRUD endpoint for task comments, scoped by project membership."""

    permission_classes = [CommentsAccessPermission]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ["created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = TaskComment.objects.select_related(
            "task", "task__project", "author"
        ).all()

        user = self.request.user

        # Admin sees all comments
        if getattr(user, "role", None) != User.Role.ADMIN:
            queryset = queryset.filter(
                task__project__memberships__user=user
            ).distinct()

        # Filter by task
        task_param = self.request.query_params.get("task")
        if task_param:
            queryset = queryset.filter(task_id=task_param)

        return queryset

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return TaskCommentCreateSerializer
        return TaskCommentSerializer

    def perform_create(self, serializer):
        task = serializer.validated_data.get("task")
        user = self.request.user

        if task is None:
            raise ValidationError({"task": ["Task is required."]})

        project = task.project
        if project is None:
            raise ValidationError({"task": ["Task must belong to a project."]})

        # Admin bypass
        if getattr(user, "role", None) != User.Role.ADMIN:
            is_member = ProjectMembership.objects.filter(
                project=project, user=user
            ).exists()
            if not is_member:
                raise PermissionDenied(
                    "You must be a member of the task's project to comment."
                )

        serializer.save(author=user)
