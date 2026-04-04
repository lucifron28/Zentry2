from django.conf import settings
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken

from apps.users.serializers import CurrentUserSerializer
from .serializers import LoginSerializer, ZentryTokenRefreshSerializer


AUTH_COOKIE = settings.AUTH_COOKIE_REFRESH_NAME
AUTH_COOKIE_MAX_AGE = settings.AUTH_COOKIE_REFRESH_MAX_AGE
AUTH_COOKIE_SECURE = settings.AUTH_COOKIE_SECURE
AUTH_COOKIE_HTTP_ONLY = settings.AUTH_COOKIE_HTTP_ONLY
AUTH_COOKIE_PATH = settings.AUTH_COOKIE_REFRESH_PATH
AUTH_COOKIE_SAMESITE = settings.AUTH_COOKIE_SAMESITE

def set_auth_cookie(response, refresh_token):
    response.set_cookie(
        key=AUTH_COOKIE,
        value=refresh_token,
        max_age=AUTH_COOKIE_MAX_AGE,
        secure=AUTH_COOKIE_SECURE,
        httponly=AUTH_COOKIE_HTTP_ONLY,
        path=AUTH_COOKIE_PATH,
        samesite=AUTH_COOKIE_SAMESITE,
    )

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        refresh_token = data.pop('refresh', None)
        
        response = Response(data)
        if refresh_token:
            set_auth_cookie(response, refresh_token)
            
        return response


class RefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    serializer_class = ZentryTokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(AUTH_COOKIE)
        
        if refresh_token:
            # Inject it so the serializer can find it
            request.data['refresh'] = refresh_token
            
        try:
            response = super().post(request, *args, **kwargs)
        except InvalidToken as e:
            res = Response({"detail": str(e)}, status=401)
            res.delete_cookie(AUTH_COOKIE, path=AUTH_COOKIE_PATH, samesite=AUTH_COOKIE_SAMESITE)
            return res
            
        # If simplejwt rotate is enabled
        new_refresh_token = response.data.get('refresh')
        if new_refresh_token:
            set_auth_cookie(response, new_refresh_token)
            del response.data['refresh']
            
        return response


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        response = Response({"detail": "Successfully logged out."})
        response.delete_cookie(
            key=AUTH_COOKIE,
            path=AUTH_COOKIE_PATH,
            samesite=AUTH_COOKIE_SAMESITE,
        )
        return response


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CurrentUserSerializer(request.user)
        return Response(serializer.data)

