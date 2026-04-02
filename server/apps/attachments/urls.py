from django.urls import path

from .views import AttachmentsHealthView

app_name = "attachments"

urlpatterns = [
    path("health/", AttachmentsHealthView.as_view(), name="health"),
]
