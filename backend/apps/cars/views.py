from django.db import IntegrityError
from django.utils.decorators import method_decorator

from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404,
)
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from core.services.email_service import EmailService
from core.tasks.update_price_task import update_vehicle_prices
from core.validators.validators import has_profanity
from drf_yasg.utils import swagger_auto_schema

from apps.analytics.models import ViewerModel
from apps.cars.filter import VehicleFilter
from apps.cars.models import Brand, CarModel, VehicleModel, VehiclePhotoModel
from apps.cars.serializer import BrandSerializer, CarModelSerializer, VehiclePhotoSerializer, VehicleSerializer
from apps.users.permissions import IsManagerOrSuperUser, IsVehicleOwner


@method_decorator(name='get', decorator=swagger_auto_schema(security=[]))
class BrandListCreateView(ListCreateAPIView):
    """
    get: get all brands
    post: create new brand only Manager or SuperUser
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsManagerOrSuperUser]


class BrandRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get: get brand to pk
    patch: update brand only Manager or SuperUser
    delete: delete brand only Manager or SuperUser
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsManagerOrSuperUser]


class BrandAddModelView(GenericAPIView):
    """
    post: add model to brand only Manager or SuperUser
    """
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAuthenticated, IsManagerOrSuperUser, ]

    def post(self, request, *args, **kwargs):
        brand_id = self.kwargs.get('pk')
        brand = get_object_or_404(Brand, id=brand_id)

        serializer = CarModelSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            serializer.save(brand=brand)
        except IntegrityError:
            raise ValidationError({'msg': 'Model already exists'})

        return Response(serializer.data, status.HTTP_201_CREATED)


class CarModelByBrandListView(ListAPIView):
    """
    get: get car model by brand
    """
    serializer_class = CarModelSerializer
    permission_classes = [AllowAny, ]

    def get_queryset(self):
        brand = self.kwargs.get('pk')

        return CarModel.objects.get_by_brand(brand_id=brand)


class CarModelsRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get: get model to pk
    patch: update model only Manager or SuperUser
    delete: delete model only Manager or SuperUser
    """
    queryset = CarModel.objects.all()
    serializer_class = CarModelSerializer
    permission_classes = [IsManagerOrSuperUser]


class RequestMissingBrandView(GenericAPIView):
    """
    post: User reports a missing vehicle brand
    """
    def post(self, request):
        car_model = request.data.get("car_model")
        brand = request.data.get("brand")
        if not car_model:
            raise ValidationError({"msg": "Model name is required."})
        if not brand:
            raise ValidationError({"msg":"Brand name is required."})

        EmailService.send_add_model(car_model=car_model, brand=brand)

        return Response({"msg": "Thank you for your feedback!"}, status=200)


@method_decorator(name='get', decorator=swagger_auto_schema(security=[]))
class VehicleListCreateView(ListCreateAPIView):
    """
    get: get all vehicles list
    post: create new vehicle only auth user
    """
    queryset = VehicleModel.objects.all()
    serializer_class = VehicleSerializer
    filterset_class = VehicleFilter
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def perform_create(self, serializer):
        profile = self.request.user.profile
        user = self.request.user
        user_vehicles_count = VehicleModel.objects.filter(user=profile).count()

        if not profile.is_premium and user_vehicles_count >= 1:
            raise PermissionDenied({"msg": "User with base account can create only one vehicle."})

        contains_bad_words = has_profanity(serializer.validated_data.get("description", ""))

        if not hasattr(profile, 'vehicle_creation_attempts'):
            profile.vehicle_creation_attempts = 0
            profile.save()

        if contains_bad_words:
            profile.vehicle_creation_attempts += 1
            profile.save()

            max_attempts = 3
            if profile.vehicle_creation_attempts >= max_attempts:
                EmailService.send_vehicle_warning(profile)
                user.is_active = False
                user.save()
                raise PermissionDenied({"msg": "Maximum creation attempts reached. Your account is blocked."})

            raise ValidationError({
                "msg": f"The description contains foul language. You can try {max_attempts - profile.vehicle_creation_attempts} more times.",
                "edit_attempts": profile.vehicle_creation_attempts,
            })

        serializer.save(user=profile, is_active=True, is_checked=True)
        update_vehicle_prices.delay()
        return Response(serializer.data, status.HTTP_201_CREATED)


@method_decorator(name='get', decorator=swagger_auto_schema(security=[]))
class VehicleRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    """
    get: get vehicle by pk
    update: Update an ad. Only the owner of the ad is allowed to perform this action.
    delete: Delete an ad. Only the owner of the ad is allowed to perform this action.
    """
    queryset = VehicleModel.objects.all()
    serializer_class = VehicleSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsVehicleOwner]

    def get(self, request, *args, **kwargs):
        instance = self.get_object()

        if not request.user.is_authenticated or request.user.id != instance.user.id:
            ViewerModel.objects.create(vehicle=instance)

        serializer = self.get_serializer(instance)
        return Response(serializer.data)



@method_decorator(name='get', decorator=swagger_auto_schema(security=[]))
class VehicleAddPhotoView(GenericAPIView):
    """
    get: get photo of vehicle by pk
    post: create new photo of vehicle. Only the owner of the ad is allowed to perform this action.
    """
    permission_classes = [IsAuthenticatedOrReadOnly, ]

    def get(self, request, *args, **kwargs):
        vehicle_id = self.kwargs['pk']
        vehicle_photos = VehiclePhotoModel.objects.filter(vehicle_id=vehicle_id)
        serializer = VehiclePhotoSerializer(vehicle_photos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        vehicle_id = self.kwargs.get('pk')
        vehicle = VehicleModel.objects.get(id=vehicle_id)

        if vehicle.user.id != self.request.user.id:
            raise PermissionDenied({"msg":"You are not allowed to upload photos to this vehicle."})

        if vehicle.vehicle_photos.count() >= 5:
            raise ValidationError({"msg":"You can upload a maximum of 5 photos per vehicle."})

        is_first_photo = vehicle.vehicle_photos.count() == 0
        serializer = VehiclePhotoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(vehicle=vehicle, is_main=is_first_photo)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
