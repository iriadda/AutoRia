from django.urls import path

from apps.cars.views import (
    BrandAddModelView,
    BrandListCreateView,
    BrandRetrieveUpdateDestroyView,
    CarModelByBrandListView,
    CarModelsRetrieveUpdateDestroyView,
    RequestMissingBrandView,
    VehicleAddPhotoView,
    VehicleListCreateView,
    VehicleRetrieveUpdateDestroyView,
)

urlpatterns = [
    #Brand
    path('/brand', BrandListCreateView.as_view() , name='brand-list'),
    path('/brand/<int:pk>', BrandRetrieveUpdateDestroyView.as_view() , name='brand-update-delete'),
    path('/brand/<int:pk>/add_model', BrandAddModelView.as_view() , name='add-models-to-brand'),
    path('/brand/<int:pk>/models', CarModelByBrandListView.as_view() , name='get-models-by-brand'),

    #models
    path('/models/<int:pk>', CarModelsRetrieveUpdateDestroyView.as_view() , name='models-update-delete'),
    path("/brand/missing", RequestMissingBrandView.as_view(), name="report-missing-brand"),

    #Cars
    path('', VehicleListCreateView.as_view(), name='vehicle-list'),
    path('/<int:pk>', VehicleRetrieveUpdateDestroyView.as_view(), name='vehicle-update-delete'),
     path('/photo/<int:pk>', VehicleAddPhotoView.as_view(), name='vehicle-photo-add'),
]