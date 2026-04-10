"""Domain models for Zentry Comments."""

from django.conf import settings
from django.db import models

from apps.core.models.base import TimeStampedModel


class TaskComment(TimeStampedModel):
    """A comment left by a project member on a task."""

    task = models.ForeignKey(
        'tasks.Task',
        on_delete=models.CASCADE,
        related_name='comments',
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='task_comments',
    )
    body = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Comment by {self.author} on {self.task}'
