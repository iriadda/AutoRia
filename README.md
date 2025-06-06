# Auto-Ria clone
Цей проєкт є клоном популярного сервісу продажу автомобілів **AutoRia**, який включає окремий фронтенд та бекенд.

## Зміст
- [Опис](#опис)
- [Структура](#Структура)
- [Встановлення](#встановлення)
- [Налаштування](#налаштування)
- [Postman Collection](#Postman Collection)


## Опис
AutoRia Clone складається з:
- **Бекенд**: REST API на Django для управління оголошеннями, конвертації цін за курсом ПриватБанку, аналітики та чатів.
- **Фронтенд**: React-додаток для зручної взаємодії з API.

Проєкт підтримує ролі (покупець, продавець, менеджер, адміністратор), щоденне оновлення цін через Celery та завантаження фотографій.

## Структура
- `/backend`: Django REST API (див. [backend/README.md](backend/README.md)).
- `/frontend`: React-додаток (див. [frontend/README.md](frontend/README.md)).


## Встановлення
1. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/your-username/autoRia.git

2. Дивіться інструкції в:
    Backend README для API.
    Frontend README для клієнтської частини.

## Postman Collection
[🔗 Postman Collection](./postman_collection.json)
або
https://iryna-6985021.postman.co/workspace/Iryna's-Workspace~3716ed05-8004-4912-8256-954974483b7e/collection/43501659-1b759f1b-7f73-48b5-85d5-c0c83e9e1e2c?action=share&creator=43501659&active-environment=43501659-342401d8-9db6-4cc1-81c9-22d2e1945a71