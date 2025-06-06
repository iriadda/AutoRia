import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "configs.settings")

app=Celery('settings')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
app.conf.beat_schedule = {
    "update-prices-daily": {
        "task": "core.tasks.update_price_task.update_vehicle_prices",
        "schedule": crontab(minute=0, hour=0),
    },
}