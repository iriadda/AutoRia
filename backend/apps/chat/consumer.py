import datetime
import json

from django.contrib.auth import get_user_model
from django.db.models import F

from channels.db import database_sync_to_async
from djangochannelsrestframework.decorators import action
from djangochannelsrestframework.generics import GenericAsyncAPIConsumer

from apps.chat.models import ChatRoomModel, MessageModel

UserModel = get_user_model()


class ChatConsumer(GenericAsyncAPIConsumer):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.user_name = None
        self.room = None

    async def connect(self):
        if not self.scope['user']:
            return await self.close()

        await self.accept()
        target_user_id=self.scope['url_route']['kwargs']['pk']
        current_user_id = self.scope['user'].id
        self.user_name = await self.get_profile_name()

        if target_user_id == current_user_id:
            return  # не можна створити чат із собою

        target_user = await self.get_target_user(target_user_id)
        room_name = f"chat_{min(target_user_id, current_user_id)}_{max(target_user_id, current_user_id)}"
        private_room, _ = await ChatRoomModel.objects.aget_or_create(name=room_name)

        await self.channel_layer.group_add(
            room_name,
            self.channel_name
        )

        self.room = private_room
        await private_room.users.aadd(target_user, self.scope['user'])



        messages = await self.get_last_messages(private_room)
        for name, text in messages:
            await self.sender({
                'message': text,
                'user': name,
                'request_id': str(datetime.datetime.now().time()),
            })


    async def sender(self, data):
        await self.send_json(data)

    async def send_json(self, content, close=False):
        await self.send(text_data=json.dumps(content, ensure_ascii=False))

    @action()
    async def send_private_message(self, data, request_id, action):

        await MessageModel.objects.acreate(room=self.room, user=self.scope['user'], text=data['text'])

        await self.channel_layer.group_send(
            self.room.name,
            {
                'type': 'sender',
                'message': data['text'],
                'user': f"{self.scope['user'].id}_{self.user_name}",
                'id': request_id,
            }
        )


    @database_sync_to_async
    def get_profile_name(self):
        profile = self.scope['user'].profile
        return f"{profile.first_name} {profile.last_name}"

    @database_sync_to_async
    def get_target_user(self, user_id):
        return UserModel.objects.get(id=user_id)

    @database_sync_to_async
    def get_last_messages(self, room):
        if not room.users.filter(pk=self.scope['user'].pk).exists():
            return []

        qs = MessageModel.objects.filter(room=room).annotate(
            name=F('user__profile__first_name'),
            pk=F('user__pk')
        ).values('text', 'name', 'pk').order_by('created_at')

        return [(f"{msg['pk']}_{msg['name']}", msg['text']) for msg in qs]
