from rest_framework import serializers


class ProjectsPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Projects endpoint placeholder")
