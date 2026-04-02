from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import CommentsAccessPermission
from .serializers import CommentsPlaceholderSerializer


class CommentsHealthView(APIView):
    permission_classes = [CommentsAccessPermission]

    def get(self, request):
        serializer = CommentsPlaceholderSerializer()
        return Response(serializer.data)
