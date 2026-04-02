from rest_framework import serializers

from .models import User


class CurrentUserSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "display_name",
            "role",
            "is_active",
        )
        read_only_fields = fields

    def get_display_name(self, obj):
        full_name = obj.get_full_name().strip()
        return full_name or obj.email


class UserSummarySerializer(CurrentUserSerializer):
    """Alias serializer for future list/detail endpoints in users module."""
