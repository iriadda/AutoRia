from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from core.services.email_service import EmailService
from core.services.jwt_service import JWTService, RecoveryToken, SocketToken

from apps.auth.serializer import EmailSerializer, PasswordSerializer
from apps.users.serializer import UserSerializer

UserModel = get_user_model()


class RecoveryRequestView(GenericAPIView):
    """
    post: post recovery request. User get token on email
    """
    permission_classes = (AllowAny,)

    def get_serializer(self, *args, **kwargs):
        return None

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = EmailSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = get_object_or_404(UserModel, email=serializer.data['email'])
        EmailService.recovery(user)
        return Response({'details: email recover send'}, status=status.HTTP_200_OK)


class RecoveryPasswordView(GenericAPIView):
    """
    post: post recovery password with token
    """
    permission_classes = (AllowAny,)

    def get_serializer(self, *args, **kwargs):
        return None

    def post(self, *args, **kwargs):
        data = self.request.data
        serializer = PasswordSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        token = kwargs['token']
        user = JWTService.verify_token(token, RecoveryToken)
        user.set_password(serializer.data['password'])
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SocketTokenView(GenericAPIView):
    """
    get: get socket token
    """
    permission_classes = (IsAuthenticated,)

    def get_serializer(self, *args, **kwargs):
        return None

    def get(self, *args, **kwargs):
        token = JWTService.create_token(user=self.request.user, token_class=SocketToken)
        return Response({'token': str(token)}, status=status.HTTP_200_OK)
