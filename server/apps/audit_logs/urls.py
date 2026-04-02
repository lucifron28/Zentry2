from django.urls import path

from .views import AuditLogsHealthView

app_name = "audit_logs"

urlpatterns = [
    path("health/", AuditLogsHealthView.as_view(), name="health"),
]
