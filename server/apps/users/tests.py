from django.test import TestCase

from apps.users.models import User


class UserModelTests(TestCase):
    def test_default_role_is_user(self):
        user = User.objects.create_user(
            username="member01",
            email="member@example.com",
            password="TestPass123!",
        )

        self.assertEqual(user.role, User.Role.USER)

    def test_email_is_normalized_to_lowercase_on_save(self):
        user = User.objects.create_user(
            username="member02",
            email="Member@Example.COM",
            password="TestPass123!",
        )

        self.assertEqual(user.email, "member@example.com")


