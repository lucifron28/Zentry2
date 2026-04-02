"""Top-level URL configuration for Zentry backend."""

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('api/v1/', include('api.urls')),
    path('admin/', admin.site.urls),
]
