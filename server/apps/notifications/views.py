from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import NotificationsAccessPermission
from .serializers import NotificationsPlaceholderSerializer


class NotificationsHealthView(APIView):
    permission_classes = [NotificationsAccessPermission]

    def get(self, request):
        serializer = NotificationsPlaceholderSerializer()
        return Response(serializer.data)
