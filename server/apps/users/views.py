from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import UsersAccessPermission
from .serializers import UsersPlaceholderSerializer


class UsersHealthView(APIView):
    permission_classes = [UsersAccessPermission]

    def get(self, request):
        serializer = UsersPlaceholderSerializer()
        return Response(serializer.data)
