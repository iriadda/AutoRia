






















from datetime import timedelta
from enum import Enum


class ActionTokenEnum(Enum):
    ACTIVATE = (
        'activate',
        timedelta(minutes=30),
    )
    RECOVERY=(
        'recovery',
        timedelta(minutes=10),
    )
    SOCKET=(
        'socket',
        timedelta(seconds=10),
    )
    def __init__(self, token_type, lifetime):
        self.token_type = token_type
        self.lifetime = lifetime