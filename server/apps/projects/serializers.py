from rest_framework import serializers

from apps.users.serializers import UserSummarySerializer
from .models import Project


class ProjectMemberMutationSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(min_value=1)


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
    owner = UserSummarySerializer(read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "description",
            "status",
            "priority",
            "category",
            "due_date",
            "owner",
        )
        read_only_fields = ("id", "owner")
