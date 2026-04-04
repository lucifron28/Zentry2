from rest_framework import serializers
from .models import AuditLog
from apps.users.serializers import UserSummarySerializer

class AuditLogSerializer(serializers.ModelSerializer):
    actor_details = UserSummarySerializer(source="actor", read_only=True)

    class Meta:
        model = AuditLog
        fields = (
            "id",
            "actor",
            "actor_details",
            "action",
            "resource",
            "resource_id",
            "detail",
            "ip_address",
            "created_at",
            "updated_at",
        )
