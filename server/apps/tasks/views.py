from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.db.models import Q

from apps.users.models import User
from .models import Task
from .serializers import TaskSerializer, TaskCreateUpdateSerializer
from .permissions import TasksAccessPermission


class TaskViewSet(viewsets.ModelViewSet):
    permission_classes = [TasksAccessPermission]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "description"]
    ordering_fields = ["title", "created_at", "due_date", "priority"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Task.objects.select_related("project", "project__owner", "assignee").prefetch_related(
            "project__members"
        ).all()

        user = self.request.user
        if getattr(user, "role", None) != User.Role.ADMIN:
            queryset = queryset.filter(
                Q(project__owner_id=user.id) | Q(project__members__id=user.id)
            ).distinct()
        
        project_param = self.request.query_params.get("project")
        if project_param:
            queryset = queryset.filter(project_id=project_param)
            
        assignee_param = self.request.query_params.get("assignee")
        if assignee_param:
            queryset = queryset.filter(assignee_id=assignee_param)

        status_param = self.request.query_params.get("status")
        if status_param:
            queryset = queryset.filter(status=status_param)
            
        priority_param = self.request.query_params.get("priority")
        if priority_param:
            queryset = queryset.filter(priority=priority_param)
            
        return queryset

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return TaskCreateUpdateSerializer
        return TaskSerializer

    def _can_access_project(self, user, project):
        if getattr(user, "role", None) == User.Role.ADMIN:
            return True
        return bool(project and (project.owner_id == user.id or project.members.filter(pk=user.id).exists()))

    def _validate_write_scope(self, *, project, assignee):
        user = self.request.user
        role = getattr(user, "role", None)

        if role != User.Role.ADMIN:
            if project is None:
                raise ValidationError({"project": ["Project is required for this operation."]})

            if not self._can_access_project(user, project):
                raise PermissionDenied("You do not have access to this project.")

        if project is not None and assignee is not None:
            is_project_assignee = bool(assignee.id == project.owner_id or project.members.filter(pk=assignee.id).exists())
            if not is_project_assignee:
                raise ValidationError({"assignee": ["Assignee must be the project owner or a project member."]})

    def perform_create(self, serializer):
        project = serializer.validated_data.get("project")
        assignee = serializer.validated_data.get("assignee")
        self._validate_write_scope(project=project, assignee=assignee)
        serializer.save()

    def perform_update(self, serializer):
        project = serializer.validated_data.get("project", serializer.instance.project)
        assignee = serializer.validated_data.get("assignee", serializer.instance.assignee)
        self._validate_write_scope(project=project, assignee=assignee)
        serializer.save()
