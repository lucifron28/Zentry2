from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from django.db.models import Q

from apps.core.audit import log_audit_event
from apps.users.models import User
from .models import Project, ProjectMembership
from .serializers import (
    ProjectCreateUpdateSerializer,
    ProjectMemberMutationSerializer,
    ProjectSerializer,
)
from .permissions import ProjectsAccessPermission


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [ProjectsAccessPermission]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "description", "category"]
    ordering_fields = ["name", "created_at", "due_date", "progress"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = Project.objects.select_related("owner").prefetch_related("members").all()

        user = self.request.user
        if getattr(user, "role", None) != User.Role.ADMIN:
            queryset = queryset.filter(Q(owner_id=user.id) | Q(members__id=user.id)).distinct()
        
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
        project = serializer.save(owner=self.request.user)
        # Explicitly create owner membership
        ProjectMembership.objects.create(
            project=project,
            user=self.request.user,
            role=ProjectMembership.Role.OWNER
        )

    def _get_member_target_user(self, request):
        serializer = ProjectMemberMutationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user_id = serializer.validated_data["user_id"]
        user = User.objects.filter(pk=user_id, is_active=True).first()
        if user is None:
            raise ValidationError({"user_id": ["User not found."]})

        return user

    def _serialize_project(self, project):
        refreshed_project = (
            Project.objects.select_related("owner").prefetch_related("members").get(pk=project.pk)
        )
        serializer = self.get_serializer(refreshed_project)
        return serializer.data

    @action(detail=True, methods=["post"])
    def members(self, request, pk=None):
        project = self.get_object()
        user = self._get_member_target_user(request)

        if project.members.filter(pk=user.pk).exists():
            raise ValidationError({"non_field_errors": ["User is already a project member."]})

        project.members.add(user)
        log_audit_event(
            action="project_member_added",
            actor_id=request.user.id,
            details={
                "project_id": project.id,
                "member_user_id": user.id,
            },
        )
        return Response(self._serialize_project(project), status=status.HTTP_200_OK)

    @members.mapping.delete
    def remove_member(self, request, pk=None):
        project = self.get_object()
        user = self._get_member_target_user(request)

        if project.owner_id == user.id:
            raise ValidationError({"non_field_errors": ["Project owner cannot be removed from members."]})

        if not project.members.filter(pk=user.pk).exists():
            raise ValidationError({"non_field_errors": ["User is not a project member."]})

        project.members.remove(user)
        log_audit_event(
            action="project_member_removed",
            actor_id=request.user.id,
            details={
                "project_id": project.id,
                "member_user_id": user.id,
            },
        )
        return Response(self._serialize_project(project), status=status.HTTP_200_OK)
