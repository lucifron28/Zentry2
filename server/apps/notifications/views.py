from rest_framework import viewsets, mixins, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Notification
from .serializers import NotificationSerializer
from .permissions import NotificationsAccessPermission


class NotificationViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet
):
    permission_classes = [NotificationsAccessPermission]
    serializer_class = NotificationSerializer

    def get_queryset(self):
        queryset = Notification.objects.filter(recipient=self.request.user).select_related("actor")
        
        is_read_param = self.request.query_params.get("is_read")
        if is_read_param is not None:
            is_read = is_read_param.lower() in ("true", "1", "yes")
            queryset = queryset.filter(is_read=is_read)
            
        return queryset

    @action(detail=False, methods=["post"], url_path="mark-all-read")
    def mark_all_read(self, request):
        self.get_queryset().filter(is_read=False).update(is_read=True)
        return Response({"status": "All notifications marked as read"})
