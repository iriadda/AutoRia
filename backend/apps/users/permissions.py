from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return bool (request.user and request.user.is_staff and request.user.is_superuser)


class IsPremium(BasePermission):
    def has_permission(self, request, view):
        return bool (request.user and request.user.profile.is_premium)

class IsManagerOrSuperUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and (request.user.is_superuser or request.user.is_manager))

class IsVehicleOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['PUT', 'PATCH', 'DELETE']:
            return obj.user == request.user.profile  # Перевіряємо, чи є користувач власником
        return True
