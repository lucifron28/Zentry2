from rest_framework import viewsets, mixins
from rest_framework.permissions import IsAuthenticated

from .models import User
from .serializers import UserSummarySerializer


class UserViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSummarySerializer
    queryset = User.objects.filter(is_active=True).order_by("first_name", "last_name", "email")
