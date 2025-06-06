
#### Бекенд README (`backend/README.md`)

# AutoRia Backend
REST API для клону AutoRia, створений на Django REST Framework.

## Зміст
- [Технології](#технології)
- [Вимоги](#вимоги)
- [Встановлення](#встановлення)
- [Налаштування](#налаштування)
- [Запуск](#запуск)
- [API Ендпоінти](#api-ендпоінти)
- [Модулі](#модулі)

## Технології
- Python 3.13
- Django 5.x
- Django REST Framework
- Poetry
- Docker & docker-compose
- Celery + django-celery-beat
- Redis
- MySQL
- Pillow
- Requests
- SimpleJWT
- better-profanity
- Django Channels

## Вимоги
- Docker і docker-compose
- Poetry (`pip install poetry`)
- Git

## Встановлення
1. Перейдіть у папку бекенду:
   ```bash
   cd backend

2. У корені створіть .env і додайте необхідні змінні середовища.


3. Запустіть через Docker:
```bash
docker-compose up --build
```

##  Модулі
- users: Управління користувачами, ролі (покупець, продавець, менеджер, адміністратор).
- cars: Оголошення, бренди, моделі, конвертація цін.
- chat: Чати через Django Channels (WebSockets).
- analytics: Аналітика переглядів і цін.
- auth: Аутентифікація через SimpleJWT.
- configs: Налаштування проєкту.
- core: Базові моделі та утиліти.

## API
колекція Postman
