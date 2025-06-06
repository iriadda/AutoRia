from datetime import timedelta

from django.db.models import Avg
from django.utils.timezone import now

from rest_framework.generics import GenericAPIView, get_object_or_404
from rest_framework.response import Response

from apps.analytics.models import ViewerModel
from apps.cars.models import VehicleModel
from apps.users.permissions import IsPremium


class AnalyticsView(GenericAPIView):
    """
    get: get analytics data to vehicle pk
    """
    permission_classes = [IsPremium]
    queryset = ViewerModel.objects.all()

    def get_serializer(self, *args, **kwargs):
        return None

    def get(self,request,*args,**kwargs):
        vehicle = get_object_or_404(VehicleModel, pk=kwargs['pk'])

        now_time = now()
        today = now_time.date()
        week_ago = now_time - timedelta(days=7)
        month_ago = now_time - timedelta(days=30)

        views_all = ViewerModel.objects.filter(vehicle=vehicle).count()
        views_day = ViewerModel.objects.filter(vehicle=vehicle, viewed_at__date=today).count()
        views_week = ViewerModel.objects.filter(vehicle=vehicle, viewed_at__gte=week_ago).count()
        views_month = ViewerModel.objects.filter(vehicle=vehicle, viewed_at__gte=month_ago).count()


        region = vehicle.region
        avg_price_region = VehicleModel.objects.filter(region=region).aggregate(avg=Avg("price_usd"))["avg"]

        avg_price_ua = VehicleModel.objects.aggregate(avg=Avg("price_usd"))["avg"]

        return Response({
            "views": {
                "total": views_all,
                "day": views_day,
                "week": views_week,
                "month": views_month,
            },
            "pricing": {
                "region": str(region),
                "average_price_region_usd": round(avg_price_region or 0, 2),
                "average_price_ua_usd": round(avg_price_ua or 0, 2),
            }
        })