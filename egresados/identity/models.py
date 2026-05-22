from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Administrador'
        EGRESADO = 'EGRESADO', 'Egresado'
        EMPRESA = 'EMPRESA', 'Empresa'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.EGRESADO,
        verbose_name='Rol'
    )

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
