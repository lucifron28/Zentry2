from django.urls import path

from .views import AuthenticationHealthView

app_name = "authentication"

urlpatterns = [
    path("health/", AuthenticationHealthView.as_view(), name="health"),
]
