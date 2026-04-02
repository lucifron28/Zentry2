from rest_framework import serializers


class UsersPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Users endpoint placeholder")
