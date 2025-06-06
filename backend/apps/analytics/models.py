from django.db import models

from core.models import BaseModel

from apps.cars.models import VehicleModel


class ViewerModel(BaseModel):
    class Meta:
        db_table = 'viewer'

    vehicle = models.ForeignKey(VehicleModel, on_delete=models.CASCADE, related_name='viewers')
    viewed_at = models.DateTimeField(auto_now_add=True)