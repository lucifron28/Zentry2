from django.urls import path

from .views import TasksHealthView

app_name = "tasks"

urlpatterns = [
    path("health/", TasksHealthView.as_view(), name="health"),
]
