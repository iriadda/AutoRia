from django.db import models


class CarModelQuerySet(models.QuerySet):

    def by_brand(self, brand_id):
        return self.filter(brand_id=brand_id)


class CarModelManager(models.Manager):
    def get_queryset(self):
        return CarModelQuerySet(self.model, using=self._db)

    def get_by_brand(self, brand_id):
        return self.get_queryset().by_brand(brand_id)
