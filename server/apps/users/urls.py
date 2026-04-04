from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import UserViewSet

app_name = "users"

router = DefaultRouter()
router.register(r"", UserViewSet, basename="user")

urlpatterns = [
    path("", include(router.urls)),
]
