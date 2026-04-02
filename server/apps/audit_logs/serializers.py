from rest_framework import serializers


class AuditLogsPlaceholderSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True, default="Zentry Audit Logs endpoint placeholder")
