from django.db import models


class ChatRoomQuerySet(models.QuerySet):
    def chat(self, user):
        return self.filter(users=user).distinct()

class ChatRoomManager(models.Manager):
    def get_queryset(self):
        return ChatRoomQuerySet(self.model)

    def chat(self, user):
        return self.get_queryset().chat(user)