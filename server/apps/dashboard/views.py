from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.projects.models import Project
from apps.tasks.models import Task


class DashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Aggregate real stats
        total_projects = Project.objects.filter(members=request.user).distinct().count()
        active_tasks = Task.objects.filter(
            project__members=request.user,
            status=Task.Status.IN_PROGRESS
        ).distinct().count()
        pending_reviews = Task.objects.filter(
            project__members=request.user,
            status=Task.Status.IN_REVIEW
        ).distinct().count()
        
        # We don't have deadlines explicitly defined yet, just mock returning count
        upcoming_deadlines_count = Task.objects.filter(
            project__members=request.user,
            due_date__isnull=False
        ).distinct().count()

        return Response({
            "total_projects": total_projects,
            "active_tasks": active_tasks,
            "pending_reviews": pending_reviews,
            "upcoming_deadlines_count": upcoming_deadlines_count,
        })
