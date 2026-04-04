"""Domain models for Zentry Notifications."""

from django.conf import settings
from django.db import models

from apps.core.models.base import TimeStampedModel


class Notification(TimeStampedModel):
    """A notification sent to a user about an action in the system."""

    class TargetType(models.TextChoices):
        PROJECT = 'project', 'Project'
        TASK = 'task', 'Task'
        COMMENT = 'comment', 'Comment'
        SYSTEM = 'system', 'System'

    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
    )
    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='+',
    )
    verb = models.CharField(max_length=150)
    target_type = models.CharField(
        max_length=20,
        choices=TargetType.choices,
        blank=True,
    )
    target_id = models.PositiveIntegerField(null=True, blank=True)
    target_name = models.CharField(max_length=300, blank=True)
    is_read = models.BooleanField(default=False, db_index=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Notification for {self.recipient}: {self.verb}'
