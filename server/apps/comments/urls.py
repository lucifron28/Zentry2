from django.urls import path

from .views import CommentsHealthView

app_name = "comments"

urlpatterns = [
    path("health/", CommentsHealthView.as_view(), name="health"),
]
