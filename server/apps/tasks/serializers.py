from rest_framework import serializers

from apps.users.serializers import UserSummarySerializer
from apps.projects.serializers import ProjectSerializer
from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    project_details = ProjectSerializer(source="project", read_only=True)
    assignee_details = UserSummarySerializer(source="assignee", read_only=True)
    
    class Meta:
        model = Task
        fields = (
            "id",
            "title",
            "description",
            "status",
            "priority",
            "project",
            "project_details",
            "assignee",
            "assignee_details",
            "due_date",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("created_at", "updated_at")

class TaskCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = (
            "title",
            "description",
            "status",
            "priority",
            "project",
            "assignee",
            "due_date",
        )
