from django.core import validators as V
from django.db import models

from core.enums.redex_enum import RedexEnum
from core.models import BaseModel
from core.services.file_service import upload_vehicle_photo

from apps.cars.managers import CarModelManager
from apps.users.models import Profile


class FuelChoices(models.TextChoices):
    PETROL = 'Petrol'
    DIESEL = 'Diesel'
    ELECTRIC = 'Electric'
    HYBRID = 'Hybrid'


class RegionChoices(models.TextChoices):
    VINNYTSIA = 'vinnytsia', 'Вінницька'
    VOLYN = 'volyn', 'Волинська'
    DNIPROPETROVSK = 'dnipropetrovsk', 'Дніпропетровська'
    DONETSK = 'donetsk', 'Донецька'
    ZHYTOMYR = 'zhytomyr', 'Житомирська'
    ZAKARPATTIA = 'zakarpattia', 'Закарпатська'
    ZAPORIZHZHIA = 'zaporizhzhia', 'Запорізька'
    IVANO_FRANKIVSK = 'ivano-frankivsk', 'Івано-Франківська'
    KYIVSKA = 'kyivska', 'Київська'
    KYIV='kyiv', 'Київ'
    KIROVOHRAD = 'kirovohrad', 'Кіровоградська'
    LUHANSK = 'luhansk', 'Луганська'
    LVIV = 'lviv', 'Львівська'
    MYKOLAIV = 'mykolaiv', 'Миколаївська'
    ODESA = 'odesa', 'Одеська'
    POLTAVA = 'poltava', 'Полтавська'
    RIVNE = 'rivne', 'Рівненська'
    SUMY = 'sumy', 'Сумська'
    TERNOPIL = 'ternopil', 'Тернопільська'
    KHARKIV = 'kharkiv', 'Харківська'
    KHERSON = 'kherson', 'Херсонська'
    KHMELNYTSKYI = 'khmelnytskyi', 'Хмельницька'
    CHERKASY = 'cherkasy', 'Черкаська'
    CHERNIVTSI = 'chernivtsi', 'Чернівецька'
    CHERNIHIV = 'chernihiv', 'Чернігівська'


class Brand(BaseModel):
    class Meta:
        db_table = 'brand'

    name = models.CharField(max_length=20, unique=True,
                            validators=[V.RegexValidator(RedexEnum.BRAND_NAME.pattern, RedexEnum.BRAND_NAME.msg)])


class CarModel(BaseModel):
    class Meta:
        db_table = 'model'
        constraints = [
            models.UniqueConstraint(fields=['model', 'brand'], name='unique_model_brand')
        ]

    model = models.CharField(max_length=20,
                             validators=[V.RegexValidator(RedexEnum.CAR_MODEL.pattern, RedexEnum.CAR_MODEL.msg)])
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='models')
    objects = CarModelManager()


class VehicleModel(BaseModel):
    class Meta:
        db_table = 'cars'

    car_model = models.ForeignKey(CarModel, on_delete=models.CASCADE, related_name='car_model')

    # тип автособіля
    #photo
    year = models.IntegerField(validators=[V.MinValueValidator(1990), V.MaxValueValidator(2025)])
    mileage = models.IntegerField()
    transmission = models.CharField(max_length=9, choices=[
        ('manual', 'manual'),
        ('automatic', 'automatic')])
    fuel_type = models.CharField(max_length=8, choices=FuelChoices)
    engine_capacity = models.DecimalField(max_digits=3, decimal_places=1, validators=[
        V.MinValueValidator(0.6),
        V.MaxValueValidator(10.0)])
    description = models.TextField(blank=True, max_length=2000)
    edit_attempts = models.IntegerField(default=0)

    region = models.CharField(max_length=50, choices=RegionChoices)
    price_input = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, choices=[('USD', 'USD'), ('EUR', 'EUR'), ('UAH', 'UAH')])
    price_uah = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_eur = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    price_usd = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)


    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="cars")
    is_active = models.BooleanField(default=False)
    is_checked = models.BooleanField(default=False)


class VehiclePhotoModel(BaseModel):
    class Meta:
        db_table = 'vehicle_photos'

    vehicle = models.ForeignKey(VehicleModel, on_delete=models.CASCADE, related_name='vehicle_photos')
    photo = models.ImageField(upload_to=upload_vehicle_photo, blank=True)
    is_main = models.BooleanField(default=False)