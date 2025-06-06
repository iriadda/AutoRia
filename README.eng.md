# Auto-Ria Clone

This project is a clone of the popular car trading platform **AutoRia**, featuring a separate frontend and backend.

## Contents
- [Description](#description)
- [Structure](#Structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Postman Collection](#postman-collection)

## Description

The AutoRia Clone consists of:
- **Backend**: A Django REST API for managing listings, currency conversion using PrivatBank exchange rates, analytics, and chat functionality.
- **Frontend**: A React application for convenient interaction with the API.

The project supports user roles (buyer, seller, manager, administrator), daily currency updates via Celery, and photo uploads.

## Structure
- `/backend`: Django REST API (see [backend/README.md](backend/README.md))
- `/frontend`: React app (see [frontend/README.md](frontend/README.md))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/autoRia.git
   ```

2. Follow the instructions in:
   - Backend README for API setup.
   - Frontend README for client-side setup.

## Postman Collection

[🔗 Postman Collection](./postman_collection.json)  
or  
[Open via Postman](https://iryna-6985021.postman.co/workspace/Iryna's-Workspace~3716ed05-8004-4912-8256-954974483b7e/collection/43501659-1b759f1b-7f73-48b5-85d5-c0c83e9e1e2c?action=share&creator=43501659&active-environment=43501659-342401d8-9db6-4cc1-81c9-22d2e1945a71)