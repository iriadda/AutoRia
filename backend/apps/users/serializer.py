from django.contrib.auth import get_user_model

from rest_framework import serializers

from apps.cars.serializer import VehicleSerializer
from apps.users.models import Profile

UserModel=get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    cars = VehicleSerializer(many=True, read_only=True)
    class Meta:
        model = Profile
        fields = (
            'id',
            'first_name',
            'last_name',
            'is_premium',
            'is_seller',
            'created_at',
            'updated_at',
            'cars',
            'vehicle_creation_attempts'
        )


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()
    class Meta:
        model = UserModel
        fields = (
            'id',
            'email',
            'password',
            'last_login',
            'is_superuser',
            'is_active',
            'is_staff',
            'is_manager',
            'created_at',
            'updated_at',
            'profile',
        )
        read_only_fields = ('id', 'is_superuser', 'is_active','is_manager', 'created_at', 'updated_at', 'last_login')
        extra_kwargs = {
            'password': {
                'write_only': True,
            }
        }
    def create(self, validated_data:dict):
        profile=validated_data.pop('profile')
        user=UserModel.objects.create_user(**validated_data)
        Profile.objects.create(**profile,user=user)
        return user
