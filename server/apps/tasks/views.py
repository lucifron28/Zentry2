from rest_framework.response import Response
from rest_framework.views import APIView

from .permissions import TasksAccessPermission
from .serializers import TasksPlaceholderSerializer


class TasksHealthView(APIView):
    permission_classes = [TasksAccessPermission]

    def get(self, request):
        serializer = TasksPlaceholderSerializer()
        return Response(serializer.data)
