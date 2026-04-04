from rest_framework import serializers
from .models import Notification
from apps.users.serializers import UserSummarySerializer

class NotificationSerializer(serializers.ModelSerializer):
    actor_details = UserSummarySerializer(source="actor", read_only=True)

    class Meta:
        model = Notification
        fields = (
            "id",
            "recipient",
            "actor",
            "actor_details",
            "verb",
            "target_type",
            "target_id",
            "target_name",
            "is_read",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("created_at", "updated_at", "recipient")
