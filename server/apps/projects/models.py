"""Domain models for Zentry Projects."""

from django.conf import settings
from django.db import models
from django.db.models.signals import m2m_changed
from django.dispatch import receiver
from django.core.exceptions import ValidationError

from apps.core.models.base import TimeStampedModel


class Project(TimeStampedModel):
    """A project groups tasks, members, and milestones for a unit of work."""

    class Status(models.TextChoices):
        PLANNING = 'planning', 'Planning'
        ACTIVE = 'active', 'Active'
        ON_HOLD = 'on_hold', 'On Hold'
        COMPLETED = 'completed', 'Completed'
        OVERDUE = 'overdue', 'Overdue'

    class Priority(models.TextChoices):
        LOW = 'low', 'Low'
        MEDIUM = 'medium', 'Medium'
        HIGH = 'high', 'High'
        CRITICAL = 'critical', 'Critical'

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PLANNING,
        db_index=True,
    )
    priority = models.CharField(
        max_length=20,
        choices=Priority.choices,
        default=Priority.MEDIUM,
        db_index=True,
    )
    category = models.CharField(max_length=100, blank=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='owned_projects',
    )
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name='member_projects',
    )
    due_date = models.DateField(null=True, blank=True)
    progress = models.PositiveSmallIntegerField(
        default=0,
        help_text='Completion percentage 0-100',
    )
    task_count = models.PositiveIntegerField(
        default=0,
        help_text='Denormalized total tasks count',
    )

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name

@receiver(m2m_changed, sender=Project.members.through)
def project_members_changed(sender, instance, action, pk_set, **kwargs):
    """Enforce that the owner must remain a member of the project."""
    if action == 'pre_remove':
        if instance.owner_id in pk_set:
            raise ValidationError('Project owner cannot be removed from members.')
    elif action == 'pre_clear':
        if instance.members.filter(pk=instance.owner_id).exists():
            raise ValidationError('Project owner cannot be removed from members.')
