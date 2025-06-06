from django.urls import path

from .consumer import ChatConsumer

websocket_urlpatterns = [
    path('<int:pk>', ChatConsumer.as_asgi())
]