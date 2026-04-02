from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from apps.users.models import User
from apps.users.serializers import CurrentUserSerializer


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, trim_whitespace=False)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    user = CurrentUserSerializer(read_only=True)

    default_error_messages = {
        "invalid_credentials": "Invalid email or password.",
        "inactive_user": "User account is inactive.",
    }

    def validate(self, attrs):
        email = attrs["email"].lower()
        password = attrs["password"]

        user = User.objects.filter(email=email).first()
        if not user or not user.check_password(password):
            raise AuthenticationFailed(self.error_messages["invalid_credentials"])

        if not user.is_active:
            raise AuthenticationFailed(self.error_messages["inactive_user"])

        refresh = RefreshToken.for_user(user)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": CurrentUserSerializer(user).data,
        }


class ZentryTokenRefreshSerializer(TokenRefreshSerializer):
    """Simple JWT refresh serializer kept explicit for API clarity."""
