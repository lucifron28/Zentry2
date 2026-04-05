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
        through='ProjectMembership',
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


class ProjectMembership(TimeStampedModel):
    """Explicit link between users and projects with roles."""

    class Role(models.TextChoices):
        OWNER = 'owner', 'Owner'
        MANAGER = 'manager', 'Manager'
        MEMBER = 'member', 'Member'

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='memberships')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.MEMBER)

    class Meta:
        unique_together = ('project', 'user')
        verbose_name = 'Project Membership'
        verbose_name_plural = 'Project Memberships'

    def __str__(self):
        return f"{self.user} - {self.project} ({self.role})"


@receiver(m2m_changed, sender=Project.members.through)
def project_members_changed(sender, instance, action, pk_set, **kwargs):
    """Enforce that the owner must remain a member of the project."""
    # When using a custom through model, pk_set contains the through model's pks if it's 'pre_remove',
    # or the related objects pks if it's 'post_add' etc? No, DRF usually makes M2M changes
    # but with through models, you often have to use instance.memberships directly.
    # However, m2m_changed still works!
    if action == 'pre_remove':
        if instance.owner_id in pk_set:
            raise ValidationError('Project owner cannot be removed from members.')
    elif action == 'pre_clear':
        if instance.members.filter(pk=instance.owner_id).exists():
            raise ValidationError('Project owner cannot be removed from members.')
