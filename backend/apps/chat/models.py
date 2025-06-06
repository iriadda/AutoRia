from django.contrib.auth import get_user_model
from django.db import models

from apps.chat.manager import ChatRoomManager

UserModel=get_user_model()

class ChatRoomModel(models.Model):
    class Meta:
        db_table = 'chat_room'
    name = models.CharField(max_length=50)
    users = models.ManyToManyField(UserModel, related_name='chat_rooms')

    objects = ChatRoomManager()

    def __str__(self):
        return self.name

class MessageModel(models.Model):
    class Meta:
        db_table = 'chat_message'
        ordering = ('created_at',)

    room = models.ForeignKey(ChatRoomModel, on_delete=models.CASCADE, related_name='messages')
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='messages')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)