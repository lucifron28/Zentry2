from django.urls import path

from .views import UsersHealthView

app_name = "users"

urlpatterns = [
    path("health/", UsersHealthView.as_view(), name="health"),
]
