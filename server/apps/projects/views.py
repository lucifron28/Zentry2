from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import ProjectsAccessPermission
from .serializers import ProjectsPlaceholderSerializer


class ProjectsHealthView(APIView):
    permission_classes = [ProjectsAccessPermission]

    def get(self, request):
        serializer = ProjectsPlaceholderSerializer()
        return Response(serializer.data)
