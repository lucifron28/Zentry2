from django.urls import include, path
from apps.dashboard.views import DashboardStatsView

urlpatterns = [
    path("auth/", include("apps.authentication.urls")),
    path("users/", include("apps.users.urls")),
    path("projects/", include("apps.projects.urls")),
    path("tasks/", include("apps.tasks.urls")),
    path("comments/", include("apps.comments.urls")),
    path("attachments/", include("apps.attachments.urls")),
    path("notifications/", include("apps.notifications.urls")),
    path("audit-logs/", include("apps.audit_logs.urls")),
    path("dashboard/stats/", DashboardStatsView.as_view(), name="dashboard_stats"),
]
