from rest_framework import serializers

from apps.users.serializers import UserSummarySerializer
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSummarySerializer(read_only=True)
    members = UserSummarySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "description",
            "status",
            "priority",
            "category",
            "owner",
            "members",
            "due_date",
            "progress",
            "task_count",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("progress", "task_count", "created_at", "updated_at")


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = (
            "name",
            "description",
            "status",
            "priority",
            "category",
            "due_date",
        )
