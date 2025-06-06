from django.urls import path

from apps.chat.views import MyPrivateChatsView

urlpatterns = [
    path('/my-rooms', MyPrivateChatsView.as_view()),
]