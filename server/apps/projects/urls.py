from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet

app_name = "projects"

router = DefaultRouter()
router.register(r"", ProjectViewSet, basename="project")

urlpatterns = [
    path("", include(router.urls)),
]
