from django.urls import path

from .views import CurrentUserView, LoginView, RefreshView

app_name = "authentication"

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("refresh/", RefreshView.as_view(), name="refresh"),
    path("me/", CurrentUserView.as_view(), name="me"),
]
