from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import User
from .models import Project


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
        self.project.members.add(self.owner, self.member)

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
