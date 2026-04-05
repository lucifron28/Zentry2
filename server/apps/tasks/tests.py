from rest_framework import status
from rest_framework.test import APITestCase

from apps.projects.models import Project, ProjectMembership
from apps.users.models import User
from .models import Task


class TaskAccessPolicyTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="taskadmin",
            email="taskadmin@example.com",
            password="TestPass123!",
            role=User.Role.ADMIN,
        )
        self.pm_owner = User.objects.create_user(
            username="taskpmowner",
            email="taskpmowner@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.pm_manager = User.objects.create_user(
            username="taskpmmanager",
            email="taskpmmanager@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.team_member = User.objects.create_user(
            username="taskmember",
            email="taskmember@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.outsider = User.objects.create_user(
            username="taskoutsider",
            email="taskoutsider@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )

        self.project_visible = Project.objects.create(
            name="Visible Project",
            owner=self.pm_owner,
            status=Project.Status.ACTIVE,
            priority=Project.Priority.MEDIUM,
        )
        # Roles: pm_owner=OWNER, pm_manager=MANAGER, team_member=MEMBER
        ProjectMembership.objects.create(project=self.project_visible, user=self.pm_owner, role=ProjectMembership.Role.OWNER)
        ProjectMembership.objects.create(project=self.project_visible, user=self.pm_manager, role=ProjectMembership.Role.MANAGER)
        ProjectMembership.objects.create(project=self.project_visible, user=self.team_member, role=ProjectMembership.Role.MEMBER)

        self.project_hidden = Project.objects.create(
            name="Hidden Project",
            owner=self.admin,
            status=Project.Status.ACTIVE,
            priority=Project.Priority.HIGH,
        )
        ProjectMembership.objects.create(project=self.project_hidden, user=self.admin, role=ProjectMembership.Role.OWNER)

        self.visible_task = Task.objects.create(
            title="Visible Task",
            description="Task in visible project",
            project=self.project_visible,
            assignee=self.team_member,
            status=Task.Status.TODO,
            priority=Task.Priority.MEDIUM,
        )
        self.hidden_task = Task.objects.create(
            title="Hidden Task",
            description="Task in hidden project",
            project=self.project_hidden,
            assignee=self.admin,
            status=Task.Status.IN_PROGRESS,
            priority=Task.Priority.HIGH,
        )

        self.list_url = "/api/v1/tasks/"
        self.visible_detail_url = f"/api/v1/tasks/{self.visible_task.id}/"
        self.hidden_detail_url = f"/api/v1/tasks/{self.hidden_task.id}/"

    def _auth_as(self, user):
        self.client.force_authenticate(user=user)

    def test_unauthenticated_user_cannot_list_tasks(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_team_member_list_is_scoped_to_membership(self):
        self._auth_as(self.team_member)

        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task_ids = {task["id"] for task in response.data["results"]}
        self.assertIn(self.visible_task.id, task_ids)
        self.assertNotIn(self.hidden_task.id, task_ids)

    def test_project_member_cannot_create_task(self):
        self._auth_as(self.team_member)

        response = self.client.post(
            self.list_url,
            {
                "title": "Blocked task",
                "project": self.project_visible.id,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_project_manager_can_create_task(self):
        self._auth_as(self.pm_manager)

        response = self.client.post(
            self.list_url,
            {
                "title": "Allowed task",
                "description": "Created by project manager",
                "project": self.project_visible.id,
                "assignee": self.team_member.id,
                "status": Task.Status.TODO,
                "priority": Task.Priority.LOW,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["project"], self.project_visible.id)

    def test_project_manager_can_delete_task(self):
        self._auth_as(self.pm_manager)
        response = self.client.delete(self.visible_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_project_manager_cannot_create_task_in_inaccessible_project(self):
        self._auth_as(self.pm_manager)

        response = self.client.post(
            self.list_url,
            {
                "title": "Blocked inaccessible task",
                "project": self.project_hidden.id,
                "status": Task.Status.TODO,
                "priority": Task.Priority.MEDIUM,
            },
            format="json",
        )

        # Forbidden because no membership in hidden project
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_project_manager_cannot_assign_non_project_member(self):
        self._auth_as(self.pm_manager)

        response = self.client.post(
            self.list_url,
            {
                "title": "Bad assignee",
                "project": self.project_visible.id,
                "assignee": self.outsider.id,
                "status": Task.Status.TODO,
                "priority": Task.Priority.MEDIUM,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_project_manager_cannot_update_task_in_inaccessible_project(self):
        self._auth_as(self.pm_manager)

        response = self.client.patch(
            self.hidden_detail_url,
            {"title": "Should not update"},
            format="json",
        )

        # Scoped out in queryset, so 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_admin_can_create_task_without_project(self):
        self._auth_as(self.admin)

        response = self.client.post(
            self.list_url,
            {
                "title": "Admin general task",
                "description": "Admin-created without project",
                "status": Task.Status.TODO,
                "priority": Task.Priority.LOW,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIsNone(response.data["project"])
