from rest_framework import serializers

from apps.cars.models import Brand, CarModel, VehicleModel, VehiclePhotoModel


class BrandSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'name')


class CarModelSerializer(serializers.ModelSerializer):
    brand = BrandSimpleSerializer(read_only=True)

    class Meta:
        model = CarModel
        fields = ('id', 'model', 'brand')


class BrandSerializer(serializers.ModelSerializer):
    models = CarModelSerializer(many=True, read_only=True)

    class Meta:
        model = Brand
        fields = ('id', 'name', 'models', 'created_at', 'updated_at')


class VehiclePhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehiclePhotoModel
        fields = ('id', 'photo', 'is_main', 'created_at', 'updated_at')


class VehicleSerializer(serializers.ModelSerializer):
    car_model_detail = CarModelSerializer(source='car_model', read_only=True)
    vehicle_photos = VehiclePhotoSerializer(many=True, read_only=True)

    class Meta:
        model = VehicleModel
        fields = (
            'id',
            'car_model',
            'car_model_detail',
            'year',
            'mileage',
            'transmission',
            'fuel_type',
            'engine_capacity',
            'description',
            'region',
            'price_input',
            'currency',
            'price_eur',
            'price_uah',
            'price_usd',
            'currency',
            'is_active',
            'is_checked',
            'user_id',
            'created_at',
            'updated_at',
            'edit_attempts',
            'vehicle_photos'
        )
        read_only_fields = ('edit_attempts',)
