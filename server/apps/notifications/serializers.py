from rest_framework import serializers


class NotificationsPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Notifications endpoint placeholder")
