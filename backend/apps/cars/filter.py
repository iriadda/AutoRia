from django_filters import rest_framework as filters

from apps.cars.models import VehicleModel


class VehicleFilter(filters.FilterSet):
    brand = filters.NumberFilter(field_name='car_model__brand_id')
    model = filters.NumberFilter(field_name='car_model_id')
    fuel_type = filters.CharFilter(field_name='fuel_type', lookup_expr='iexact')
    transmission = filters.CharFilter(field_name='transmission', lookup_expr='iexact')

    year_from = filters.NumberFilter(field_name='year', lookup_expr='gte')
    year_to = filters.NumberFilter(field_name='year', lookup_expr='lte')

    price_from = filters.NumberFilter(field_name='price_usd', lookup_expr='gte')
    price_to = filters.NumberFilter(field_name='price_usd', lookup_expr='lte')

    user_id = filters.NumberFilter(field_name='user__id')
    is_active = filters.BooleanFilter(field_name='is_active')
    is_checked = filters.BooleanFilter(field_name='is_checked')

    class Meta:
        model = VehicleModel
        fields = ['brand', 'model', 'fuel_type', 'transmission', 'year_from', 'year_to', 'user_id', 'is_active', 'is_checked', 'price_from', 'price_to']
