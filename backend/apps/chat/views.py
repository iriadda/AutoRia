from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.chat.manager import ChatRoomManager
from apps.chat.models import ChatRoomModel


class MyPrivateChatsView(GenericAPIView):
    def get_serializer(self, *args, **kwargs):
        return None

    def get(self, request):
        user = request.user
        private_rooms = ChatRoomModel.objects.chat(user=user)

        data = []

        for room in private_rooms:
            other_user = room.users.exclude(id=user.id).first()
            if not other_user:
                continue
            data.append({
                'room_name': room.name,
                'user_id': other_user.id,
                'username': f"{other_user.profile.first_name} {other_user.profile.last_name}"
            })

        return Response(data)
