from enum import Enum


class RedexEnum(Enum):
    BRAND_NAME = (
        r'^[A-Z][a-zA-Z]{1,19}$',
        'Name must start with a capital letter and be 2–20 characters long',
    )
    CAR_MODEL = (
        r'^[A-Za-z0-9\- ]{1,30}$',
        'Only letters, numbers, dashes and spaces are allowed (max 30 characters)',
    )

    def __init__(self, pattern: str, msg: str):
        self.pattern = pattern
        self.msg = msg