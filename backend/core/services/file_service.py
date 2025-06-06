import os
from uuid import uuid1


def upload_vehicle_photo(instance, filename:str)->str:
    extension = filename.split('.')[-1]
    return os.path.join(str(instance.vehicle.id), f'{uuid1()}.{extension}')