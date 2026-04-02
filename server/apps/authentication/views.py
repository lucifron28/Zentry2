from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import AuthenticationAccessPermission
from .serializers import AuthenticationPlaceholderSerializer


class AuthenticationHealthView(APIView):
    permission_classes = [AuthenticationAccessPermission]

    def get(self, request):
        serializer = AuthenticationPlaceholderSerializer()
        return Response(serializer.data)
