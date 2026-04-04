from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from apps.users.models import User
from apps.projects.models import Project
from apps.tasks.models import Task

class Command(BaseCommand):
    help = "Seed database with mock Zentry projects and tasks"

    def handle(self, *args, **kwargs):
        admin = User.objects.filter(email='admin@example.com').first()
        if not admin:
            self.stdout.write(self.style.ERROR("Admin user not found. Please create admin@example.com first."))
            return

        # Create Projects
        projects_data = [
            ("Horizon Terminal Phase II", "Expanding the core infrastructure layer.", Project.Status.ACTIVE, Project.Priority.HIGH, 64),
            ("Starlight Design System", "Component library and design tokens.", Project.Status.ACTIVE, Project.Priority.MEDIUM, 38),
            ("Quantum Analytics", "Real-time dashboard for metrics.", Project.Status.PLANNING, Project.Priority.CRITICAL, 0),
            ("Vortex DB Migration", "Postgres cluster migration.", Project.Status.ON_HOLD, Project.Priority.CRITICAL, 21),
            ("Apex Marketing Site", "Q3 marketing site refresh.", Project.Status.COMPLETED, Project.Priority.LOW, 100),
            ("Echo Mobile App", "iOS and Android apps.", Project.Status.ACTIVE, Project.Priority.HIGH, 45),
        ]

        projects = []
        for name, desc, status, priority, progress in projects_data:
            p, created = Project.objects.get_or_create(
                name=name,
                defaults={
                    "description": desc,
                    "status": status,
                    "priority": priority,
                    "owner": admin,
                    "progress": progress,
                    "due_date": timezone.now() + timedelta(days=30),
                }
            )
            if created:
                p.members.add(admin)
                p.save()
            projects.append(p)

        # Create Tasks for Active Projects
        active_projects = [p for p in projects if p.status == Project.Status.ACTIVE]
        tasks_data = [
            ("Update CI/CD pipelines", Task.Status.TODO, Task.Priority.HIGH),
            ("Fix login CORS issue", Task.Status.DONE, Task.Priority.CRITICAL),
            ("Design new cards", Task.Status.IN_PROGRESS, Task.Priority.MEDIUM),
            ("Audit log implementation", Task.Status.IN_REVIEW, Task.Priority.HIGH),
            ("Write API docs", Task.Status.TODO, Task.Priority.LOW),
        ]

        for p in active_projects:
            for title, status, priority in tasks_data:
                Task.objects.get_or_create(
                    title=f"{p.name} - {title}",
                    defaults={
                        "project": p,
                        "assignee": admin,
                        "status": status,
                        "priority": priority,
                        "due_date": timezone.now() + timedelta(days=7),
                    }
                )

        self.stdout.write(self.style.SUCCESS("Successfully seeded Zentry projects and tasks!"))
