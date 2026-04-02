from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.users.models import User


class AuthenticationApiTests(APITestCase):
    def setUp(self):
        self.password = "TestPass123!"
        self.user = User.objects.create_user(
            username="pmuser",
            email="pm@example.com",
            password=self.password,
            role=User.Role.PROJECT_MANAGER,
            first_name="Project",
            last_name="Manager",
        )

        self.login_url = reverse("authentication:login")
        self.refresh_url = reverse("authentication:refresh")
        self.me_url = reverse("authentication:me")

    def test_login_returns_tokens_and_safe_user_payload(self):
        response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("user", response.data)
        self.assertEqual(response.data["user"]["email"], self.user.email)
        self.assertEqual(response.data["user"]["role"], User.Role.PROJECT_MANAGER)
        self.assertNotIn("password", response.data["user"])

    def test_login_fails_with_invalid_credentials(self):
        response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": "WrongPass123!"},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_returns_new_access_token(self):
        login_response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )
        refresh_token = login_response.data["refresh"]

        response = self.client.post(
            self.refresh_url,
            {"refresh": refresh_token},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_returns_current_user(self):
        login_response = self.client.post(
            self.login_url,
            {"email": self.user.email, "password": self.password},
            format="json",
        )
        access_token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access_token}")

        response = self.client.get(self.me_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.user.email)
        self.assertEqual(response.data["role"], User.Role.PROJECT_MANAGER)
        self.assertNotIn("password", response.data)


