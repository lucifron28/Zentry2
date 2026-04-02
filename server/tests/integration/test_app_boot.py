from django.test import SimpleTestCase
from django.urls import reverse


class AppBootTests(SimpleTestCase):
    def test_admin_url_resolves(self):
        self.assertEqual(reverse("admin:index"), "/admin/")
