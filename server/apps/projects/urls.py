from django.urls import path

from .views import ProjectsHealthView

app_name = "projects"

urlpatterns = [
    path("health/", ProjectsHealthView.as_view(), name="health"),
]
