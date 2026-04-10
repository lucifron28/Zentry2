from rest_framework import serializers

from apps.users.serializers import UserSummarySerializer
from .models import TaskComment


class TaskCommentSerializer(serializers.ModelSerializer):
    """Read serializer — includes nested author details."""

    author_details = UserSummarySerializer(source="author", read_only=True)

    class Meta:
        model = TaskComment
        fields = (
            "id",
            "task",
            "author",
            "author_details",
            "body",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("author", "created_at", "updated_at")


class TaskCommentCreateSerializer(serializers.ModelSerializer):
    """Write serializer — author is set automatically from request.user."""

    class Meta:
        model = TaskComment
        fields = (
            "task",
            "body",
        )
