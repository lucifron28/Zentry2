from rest_framework import viewsets, filters

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
        queryset = Task.objects.select_related("project", "assignee").all()
        
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

    def perform_create(self, serializer):
        # By default we can assign it. No special owner field for Tasks.
        serializer.save()
