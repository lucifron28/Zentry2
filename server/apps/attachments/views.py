from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import AttachmentsAccessPermission
from .serializers import AttachmentsPlaceholderSerializer


class AttachmentsHealthView(APIView):
    permission_classes = [AttachmentsAccessPermission]

    def get(self, request):
        serializer = AttachmentsPlaceholderSerializer()
        return Response(serializer.data)
