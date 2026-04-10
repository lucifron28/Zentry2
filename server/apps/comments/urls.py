from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import TaskCommentViewSet

app_name = "comments"

router = DefaultRouter()
router.register(r"", TaskCommentViewSet, basename="comment")

urlpatterns = [
    path("", include(router.urls)),
]
