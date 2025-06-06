from django.urls import path

from apps.users.views import (
    BlockUserView,
    FakeBuyPremiumView,
    ManagerUserView,
    MyProfileView,
    UnBlockUserView,
    UserListCreateView,
)

urlpatterns = [
    path('', UserListCreateView.as_view(), name='users-list-create'),
    path('/profile', MyProfileView.as_view(), name='users-profile'),
    path('/buy-premium', FakeBuyPremiumView.as_view(), name='fake-buy-premium'),
    path('/<int:pk>/manager', ManagerUserView.as_view(), name='user-manager'),
    path('/<int:pk>/block', BlockUserView.as_view(), name='user-block'),
    path('/<int:pk>/unblock', UnBlockUserView.as_view(), name='user-unblock'),
]