"""Admin registration for Zentry Comments."""

from django.contrib import admin

from .models import TaskComment


@admin.register(TaskComment)
class TaskCommentAdmin(admin.ModelAdmin):
    list_display = ("id", "task", "author", "body_preview", "created_at")
    list_filter = ("created_at",)
    search_fields = ("body", "author__email", "task__title")
    raw_id_fields = ("task", "author")

    @admin.display(description="Body")
    def body_preview(self, obj):
        return obj.body[:80] + "..." if len(obj.body) > 80 else obj.body
