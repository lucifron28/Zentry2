from rest_framework import serializers


class TasksPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Tasks endpoint placeholder")
