from django.urls import include, path

from apps.analytics.views import AnalyticsView

urlpatterns=[
    path('/<int:pk>', AnalyticsView.as_view(), name='analytics'),
]