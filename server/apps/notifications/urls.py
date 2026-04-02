from django.urls import path

from .views import NotificationsHealthView

app_name = "notifications"

urlpatterns = [
    path("health/", NotificationsHealthView.as_view(), name="health"),
]
