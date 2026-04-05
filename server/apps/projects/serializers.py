from rest_framework import serializers

from apps.users.models import User
from apps.users.serializers import UserSummarySerializer
from .models import Project, ProjectMembership


class ProjectMemberMutationSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(min_value=1)


class ProjectMembershipSerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)
    
    class Meta:
        model = ProjectMembership
        fields = ("user", "role")


class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSummarySerializer(read_only=True)
    members = ProjectMembershipSerializer(source="memberships", many=True, read_only=True)
    user_permissions = serializers.SerializerMethodField()
    current_user_role = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "description",
            "status",
            "priority",
            "category",
            "owner",
            "members",
            "user_permissions",
            "current_user_role",
            "due_date",
            "progress",
            "task_count",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("progress", "task_count", "created_at", "updated_at")

    def get_user_permissions(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return {
                "can_edit": False,
                "can_delete": False,
                "can_manage_tasks": False,
                "can_manage_members": False,
            }

        user = request.user
        if getattr(user, "role", None) == User.Role.ADMIN:
            return {
                "can_edit": True,
                "can_delete": True,
                "can_manage_tasks": True,
                "can_manage_members": True,
            }

        membership = obj.memberships.filter(user=user).first()
        if not membership:
            return {
                "can_edit": False,
                "can_delete": False,
                "can_manage_tasks": False,
                "can_manage_members": False,
            }

        role = membership.role
        is_owner = role == ProjectMembership.Role.OWNER
        is_manager = role == ProjectMembership.Role.MANAGER

        return {
            "can_edit": is_owner or is_manager,
            "can_delete": is_owner,
            "can_manage_tasks": is_owner or is_manager,
            "can_manage_members": is_owner,
        }

    def get_current_user_role(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return None

        membership = obj.memberships.filter(user=request.user).first()
        return membership.role if membership else None


class ProjectCreateUpdateSerializer(serializers.ModelSerializer):
    owner = UserSummarySerializer(read_only=True)

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "description",
            "status",
            "priority",
            "category",
            "due_date",
            "owner",
        )
        read_only_fields = ("id", "owner")
