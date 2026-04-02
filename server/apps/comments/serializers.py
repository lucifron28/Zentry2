from rest_framework import serializers


class CommentsPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Comments endpoint placeholder")
