from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from drf_yasg.utils import swagger_auto_schema

from apps.users.models import Profile
from apps.users.permissions import IsManagerOrSuperUser, IsSuperUser
from apps.users.serializer import ProfileSerializer, UserSerializer

UserModel = get_user_model()


@method_decorator(name='post', decorator=swagger_auto_schema(security=[]))
class UserListCreateView(ListCreateAPIView):
    """
    get: get user list
    post: create user
    """
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class MyProfileView(GenericAPIView):
    """
    get: get user profile
    patch: patch user profile
    """

    def get(self, request):
        serializer_class = UserSerializer(instance=request.user)
        return Response(serializer_class.data)

    def patch(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class FakeBuyPremiumView(GenericAPIView):
    """
    patch: patch user profile. Buy premium
    """

    def get_serializer(self, *args, **kwargs):
        return None

    def patch(self, request):
        profile = request.user.profile

        if not self.request.user:
            raise PermissionDenied({"msg":"You are not allowed to upload photos to this vehicle."})

        if not profile.is_premium:
            profile.is_premium = True
            profile.save()
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ManagerUserView(GenericAPIView):
    """
    patch: patch user to manager. Only superuser
    """
    permission_classes = [IsSuperUser]

    def get_queryset(self):
        return UserModel.objects.all().exclude(id=self.request.user.id)

    def patch(self, request, *args, **kwargs):
        user = self.get_object()

        if not user.is_manager:
            user.is_manager = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlockUserView(GenericAPIView):
    """
    patch: block user. Only superuser or manager
    """
    permission_classes = [IsManagerOrSuperUser]

    def get_queryset(self):
        return UserModel.objects.all().exclude(id=self.request.user.id)

    def patch(self, *args,**kwargs):
        user = self.get_object()
        if user.is_active:
            user.is_active = False
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UnBlockUserView(GenericAPIView):
    """
    patch: unblock user. Only superuser or manager
    """
    permission_classes = [IsManagerOrSuperUser]

    def get_queryset(self):
        return UserModel.objects.all().exclude(id=self.request.user.id)

    def patch(self, *args,**kwargs):
        user = self.get_object()
        if not user.is_active:
            user.is_active = True
            user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)