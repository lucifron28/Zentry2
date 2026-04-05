from rest_framework import viewsets, filters
from rest_framework.exceptions import PermissionDenied, ValidationError
from django.db.models import Q

from apps.users.models import User
from apps.projects.models import ProjectMembership
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
            "project__memberships"
        ).all()

        user = self.request.user
        if getattr(user, "role", None) != User.Role.ADMIN:
            queryset = queryset.filter(
                project__memberships__user=user
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

    def _get_project_membership(self, user, project):
        if getattr(user, "role", None) == User.Role.ADMIN:
            return None # Admins don't need membership for access
        return ProjectMembership.objects.filter(project=project, user=user).first()

    def _validate_write_scope(self, *, project, assignee):
        user = self.request.user
        if getattr(user, "role", None) == User.Role.ADMIN:
            return

        if project is None:
            raise ValidationError({"project": ["Project is required for this operation."]})

        membership = self._get_project_membership(user, project)
        if not membership or membership.role not in {ProjectMembership.Role.OWNER, ProjectMembership.Role.MANAGER}:
            raise PermissionDenied("Only the project owner or a manager can manage tasks in this project.")

        if project is not None and assignee is not None:
            is_project_assignee = ProjectMembership.objects.filter(project=project, user=assignee).exists()
            if not is_project_assignee:
                raise ValidationError({"assignee": ["Assignee must be a project member."]})

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
