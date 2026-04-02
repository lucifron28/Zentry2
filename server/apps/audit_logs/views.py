from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import AuditLogsAccessPermission
from .serializers import AuditLogsPlaceholderSerializer


class AuditLogsHealthView(APIView):
    permission_classes = [AuditLogsAccessPermission]

    def get(self, request):
        serializer = AuditLogsPlaceholderSerializer()
        return Response(serializer.data)
