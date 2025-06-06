import os
from typing import Union

from django.contrib.auth import get_user_model
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template

from configs.celery import app
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken

UserModel = get_user_model()


class EmailService:
    @staticmethod
    @app.task
    def __send_email(to: list[str], template_name: str, subject: str, context: dict):
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(
            to=to,
            from_email=os.environ.get('EMAIL_HOST_USER'),
            subject=subject,
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    @classmethod
    def send_vehicle_warning(cls, vehicle):
        context = {
            "vehicle_id": vehicle.id,
            "attempts": vehicle.edit_attempts,
            "description": vehicle.description,
        }
        manager_emails = list(UserModel.objects.filter(is_manager=True).values_list('email', flat=True))
        cls.__send_email.delay(
            to=manager_emails,
            template_name="vehicle_warning.html",
            subject="Vehicle Moderation Alert",
            context=context
        )

    @classmethod
    def send_add_model(cls, car_model, brand):
        manager_emails = list(UserModel.objects.filter(is_manager=True).values_list('email', flat=True))
        print("***********",manager_emails)
        cls.__send_email.delay(
            to=manager_emails,
            template_name="add_model.html",
            subject="Add New Model",
            context={
                "car_model": car_model,
                "brand": brand,
            }
        )

    # @classmethod
    # def register(cls, user):
    #     token=JWTService.create_token(user, ActivateToken)
    #     url=f'http://localhost/activate/{token}'
    #     cls.__send_email.delay(
    #         to=[user.email,],
    #         template_name='register.html',
    #         context={'name':user.profile.name, 'url':url},
    #         subject='Register',
    #     )

    @classmethod
    def recovery(cls, user):
        token = JWTService.create_token(user, RecoveryToken)
        url = f'http://localhost/auth/recovery/{token}'
        cls.__send_email.delay(
            to=[user.email,],
            template_name='recovery.html',
            context={'url': url},
            subject='Recovery',
        )
