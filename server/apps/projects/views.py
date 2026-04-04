from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Project
from .serializers import ProjectSerializer, ProjectCreateUpdateSerializer
from .permissions import ProjectsAccessPermission
from apps.users.models import User


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [ProjectsAccessPermission]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "category"]
    ordering_fields = ["name", "created_at", "due_date", "progress"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Project.objects.select_related("owner").prefetch_related("members").all()
        
        status_param = self.request.query_params.get("status")
        if status_param:
            queryset = queryset.filter(status=status_param)
            
        priority_param = self.request.query_params.get("priority")
        if priority_param:
            queryset = queryset.filter(priority=priority_param)
            
        return queryset

    def get_serializer_class(self):
        if self.action in ["create", "update", "partial_update"]:
            return ProjectCreateUpdateSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, members=[self.request.user])

    @action(detail=True, methods=["post"])
    def members(self, request, pk=None):
        project = self.get_object()
        user_id = request.data.get("user_id")
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(pk=user_id)
            project.members.add(user)
            return Response(ProjectSerializer(project).data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    @members.mapping.delete
    def remove_member(self, request, pk=None):
        project = self.get_object()
        user_id = request.data.get("user_id")
        if not user_id:
            return Response({"error": "user_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(pk=user_id)
            project.members.remove(user)
            return Response(ProjectSerializer(project).data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
