"""Domain models for Zentry Audit Logs."""

from django.conf import settings
from django.db import models

from apps.core.models.base import TimeStampedModel


class AuditLog(TimeStampedModel):
    """Immutable log entry recording a significant system action."""

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='audit_logs',
    )
    action = models.CharField(max_length=100)   # e.g. 'created_project'
    resource = models.CharField(max_length=50)   # e.g. 'project'
    resource_id = models.PositiveIntegerField(null=True, blank=True)
    detail = models.TextField(blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        actor = self.actor or 'System'
        return f'{actor} {self.action} {self.resource}:{self.resource_id}'
