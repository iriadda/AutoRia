
#### Бекенд README (`backend/README.md`)

# AutoRia Backend
REST API для клону AutoRia, створений на Django REST Framework.

## Зміст
- [Технології](#технології)
- [Вимоги](#вимоги)
- [Встановлення](#встановлення)
- [Docker](#docker)
- [Структура проекту](#структура проекту)
- [API Ендпоінти](#api-ендпоінти)
- [Модулі](#модулі)
- [API](#api)


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
1. Налаштуйте інтерпретатор з poetry

2. У корені створіть .env і додайте необхідні змінні середовища.
(у .env є всі змінні середовища, можна пропустити)

3. Запустіть через Docker:
```bash
docker-compose up --build
```
4. Підключіться до бази даних MySQL використовуючи дані з .env

## Docker
скрипти докера:
- запуск
```bash
docker compose up
```
- зупинка
```bash
docker compose down
```
- перезбірка
```bash
docker compose up --build
```
## Структура проекту
```bash
autoriaclone/
├── backend/
│   └── ...
├── frontend/
│   └── ...
├── docker-compose.yml
├── Dockerfile
├── .env
└── README.md
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
🔗 Postman Collection або https://iryna-6985021.postman.co/workspace/Iryna's-Workspace~3716ed05-8004-4912-8256-954974483b7e/collection/43501659-1b759f1b-7f73-48b5-85d5-c0c83e9e1e2c?action=share&creator=43501659&active-environment=43501659-342401d8-9db6-4cc1-81c9-22d2e1945a71
Документація: http://localhost/api/doc
