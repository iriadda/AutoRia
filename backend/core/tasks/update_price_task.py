from decimal import Decimal

import requests
from configs.celery import app

from apps.cars.models import VehicleModel


@app.task()
def update_vehicle_prices():
    print("Updating prices...")
    url = "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11"
    response = requests.get(url)
    data = {item["ccy"]: Decimal(item["sale"]) for item in response.json() if item["ccy"] in ["USD", "EUR"]}

    usd = data["USD"]
    eur = data["EUR"]

    for vehicle in VehicleModel.objects.all():
        input_price = vehicle.price_input

        if vehicle.currency == "USD":
            vehicle.price_usd = input_price
            vehicle.price_uah = round(input_price * usd, 2)
            vehicle.price_eur = round(vehicle.price_uah / eur, 2)

        elif vehicle.currency == "EUR":
            vehicle.price_eur = input_price
            vehicle.price_uah = round(input_price * eur, 2)
            vehicle.price_usd = round(vehicle.price_uah / usd, 2)

        elif vehicle.currency == "UAH":
            vehicle.price_uah = input_price
            vehicle.price_usd = round(input_price / usd, 2)
            vehicle.price_eur = round(input_price / eur, 2)

        vehicle.save(update_fields=["price_usd", "price_eur", "price_uah"])
