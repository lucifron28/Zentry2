from rest_framework import serializers


class AuthenticationPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Authentication endpoint placeholder")
