from rest_framework import serializers


class AttachmentsPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Attachments endpoint placeholder")
