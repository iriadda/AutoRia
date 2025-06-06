from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from core.models import BaseModel

from apps.users.manager import UserManager


class UserModel(AbstractBaseUser, PermissionsMixin, BaseModel):
    class Meta:
        db_table = 'auth_user'

    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = UserManager()


class Profile(BaseModel):
    class Meta:
        db_table = 'profiles'
    user = models.OneToOneField(UserModel, on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_premium = models.BooleanField(default=False)
    is_seller = models.BooleanField(default=True)


