"""Domain models for Zentry Users."""

from django.contrib.auth.models import AbstractUser
from django.db import models

from apps.core.models.base import TimeStampedModel


class User(AbstractUser, TimeStampedModel):
	"""Custom user model with role support for Zentry."""

	class Role(models.TextChoices):
		ADMIN = "admin", "Admin"
		PROJECT_MANAGER = "project_manager", "Project Manager"
		TEAM_MEMBER = "team_member", "Team Member"

	email = models.EmailField("email address", unique=True)
	role = models.CharField(max_length=32, choices=Role.choices, default=Role.TEAM_MEMBER)

	def save(self, *args, **kwargs):
		if self.email:
			self.email = self.email.lower()
		return super().save(*args, **kwargs)

	def __str__(self):
		return self.email
