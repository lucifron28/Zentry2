from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import User
from .models import Project, ProjectMembership


class ProjectMembershipApiTests(APITestCase):
    def setUp(self):
        self.owner = User.objects.create_user(
            username="owner",
            email="owner@example.com",
            password="TestPass123!",
            role=User.Role.PROJECT_MANAGER,
            first_name="Owner",
            last_name="User",
        )
        self.admin = User.objects.create_user(
            username="admin",
            email="admin@example.com",
            password="TestPass123!",
            role=User.Role.ADMIN,
            first_name="Admin",
            last_name="User",
        )
        self.member = User.objects.create_user(
            username="member",
            email="member@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
            first_name="Member",
            last_name="User",
        )
        self.candidate = User.objects.create_user(
            username="candidate",
            email="candidate@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
            first_name="Candidate",
            last_name="User",
        )
        self.outsider = User.objects.create_user(
            username="outsider",
            email="outsider@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
            first_name="Outsider",
            last_name="User",
        )

        self.project = Project.objects.create(
            name="Membership Migration",
            description="Test project for member-management API behavior.",
            status=Project.Status.ACTIVE,
            priority=Project.Priority.MEDIUM,
            owner=self.owner,
        )
        # Formalize memberships
        ProjectMembership.objects.create(project=self.project, user=self.owner, role=ProjectMembership.Role.OWNER)
        ProjectMembership.objects.create(project=self.project, user=self.member, role=ProjectMembership.Role.MEMBER)

        self.members_url = f"/api/v1/projects/{self.project.id}/members/"

    def _auth_as(self, user):
        self.client.force_authenticate(user=user)

    def test_owner_can_add_member(self):
        self._auth_as(self.owner)

        response = self.client.post(
            self.members_url,
            {"user_id": self.candidate.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertTrue(self.project.members.filter(pk=self.candidate.id).exists())

    def test_admin_can_remove_member(self):
        self._auth_as(self.admin)

        response = self.client.delete(
            self.members_url,
            {"user_id": self.member.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.project.refresh_from_db()
        self.assertFalse(self.project.members.filter(pk=self.member.id).exists())

    def test_non_owner_non_admin_cannot_add_member(self):
        self._auth_as(self.outsider)

        response = self.client.post(
            self.members_url,
            {"user_id": self.candidate.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.project.refresh_from_db()
        self.assertFalse(self.project.members.filter(pk=self.candidate.id).exists())

    def test_duplicate_member_add_is_rejected(self):
        self._auth_as(self.owner)

        response = self.client.post(
            self.members_url,
            {"user_id": self.member.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.project.refresh_from_db()
        self.assertEqual(self.project.members.filter(pk=self.member.id).count(), 1)

    def test_owner_cannot_be_removed_from_members(self):
        self._auth_as(self.owner)

        response = self.client.delete(
            self.members_url,
            {"user_id": self.owner.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.project.refresh_from_db()
        self.assertTrue(self.project.members.filter(pk=self.owner.id).exists())

    def test_removing_non_member_is_rejected(self):
        self._auth_as(self.owner)

        response = self.client.delete(
            self.members_url,
            {"user_id": self.candidate.id},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ProjectAccessPolicyTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            username="admin2",
            email="admin2@example.com",
            password="TestPass123!",
            role=User.Role.ADMIN,
        )
        self.pm_owner = User.objects.create_user(
            username="pmowner",
            email="pmowner@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,  # No and MANAGER global roles used for management logic
        )
        self.pm_member = User.objects.create_user(
            username="pmmember",
            email="pmmember@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.team_member = User.objects.create_user(
            username="teammember",
            email="teammember@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.project_manager = User.objects.create_user(
            username="projmanager",
            email="projmanager@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )
        self.outsider = User.objects.create_user(
            username="outsider2",
            email="outsider2@example.com",
            password="TestPass123!",
            role=User.Role.TEAM_MEMBER,
        )

        self.owned_project = Project.objects.create(
            name="Owned Project",
            owner=self.pm_owner,
            status=Project.Status.ACTIVE,
            priority=Project.Priority.HIGH,
        )
        ProjectMembership.objects.create(project=self.owned_project, user=self.pm_owner, role=ProjectMembership.Role.OWNER)
        ProjectMembership.objects.create(project=self.owned_project, user=self.team_member, role=ProjectMembership.Role.MEMBER)

        self.member_project = Project.objects.create(
            name="Member Project",
            owner=self.admin,
            status=Project.Status.ACTIVE,
            priority=Project.Priority.MEDIUM,
        )
        # Self-joining as OWNER is handled in perform_create in real views, but done manually here
        ProjectMembership.objects.create(project=self.member_project, user=self.admin, role=ProjectMembership.Role.OWNER)
        ProjectMembership.objects.create(project=self.member_project, user=self.pm_member, role=ProjectMembership.Role.MEMBER)
        ProjectMembership.objects.create(project=self.member_project, user=self.project_manager, role=ProjectMembership.Role.MANAGER)

        self.hidden_project = Project.objects.create(
            name="Hidden Project",
            owner=self.admin,
            status=Project.Status.PLANNING,
            priority=Project.Priority.LOW,
        )
        ProjectMembership.objects.create(project=self.hidden_project, user=self.admin, role=ProjectMembership.Role.OWNER)

        self.list_url = "/api/v1/projects/"
        self.owned_detail_url = f"/api/v1/projects/{self.owned_project.id}/"
        self.member_detail_url = f"/api/v1/projects/{self.member_project.id}/"
        self.hidden_detail_url = f"/api/v1/projects/{self.hidden_project.id}/"

    def _auth_as(self, user):
        self.client.force_authenticate(user=user)

    def test_unauthenticated_user_cannot_list_projects(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_team_member_list_is_scoped_to_membership(self):
        self._auth_as(self.team_member)

        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ids = {project["id"] for project in response.data["results"]}
        self.assertIn(self.owned_project.id, project_ids)
        self.assertNotIn(self.member_project.id, project_ids)
        self.assertNotIn(self.hidden_project.id, project_ids)

    def test_team_member_can_create_project(self):
        self._auth_as(self.team_member)

        # In ProjectViewSet creation, it becomes owner
        response = self.client.post(
            self.list_url,
            {
                "name": "Team Member Created Project",
                "description": "Now allowed",
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verify ownership role exists
        membership = ProjectMembership.objects.get(project_id=response.data["id"], user=self.team_member)
        self.assertEqual(membership.role, ProjectMembership.Role.OWNER)

    def test_project_manager_can_update_but_not_delete(self):
        self._auth_as(self.project_manager)

        # UPDATE: Allowed
        response = self.client.patch(
            self.member_detail_url,
            {"name": "Manager Renamed Project"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # DELETE: Forbidden
        response = self.client.delete(self.member_detail_url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_project_member_cannot_update(self):
        self._auth_as(self.pm_member)

        response = self.client.patch(
            self.member_detail_url,
            {"name": "Unauthorized Rename"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_project_owner_can_delete(self):
        self._auth_as(self.pm_owner)

        response = self.client.delete(self.owned_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_outsider_cannot_retrieve_unrelated_project(self):
        self._auth_as(self.outsider)

        response = self.client.get(self.hidden_detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_admin_can_list_all_projects(self):
        self._auth_as(self.admin)

        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project_ids = {project["id"] for project in response.data["results"]}
        self.assertIn(self.owned_project.id, project_ids)
        self.assertIn(self.member_project.id, project_ids)
        self.assertIn(self.hidden_project.id, project_ids)
