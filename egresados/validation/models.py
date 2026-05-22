from django.db import models
from profiles.models import EgresadoProfile

class AcademicRecord(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDIENTE', 'Pendiente'
        VERIFIED = 'VERIFICADO', 'Verificado'
        REJECTED = 'RECHAZADO', 'Rechazado'

    egresado = models.OneToOneField(EgresadoProfile, on_delete=models.CASCADE, related_name='academic_record')
    universidad = models.CharField(max_length=200, default="Universidad de Panamá")
    carrera = models.CharField(max_length=200)
    titulo_obtenido = models.CharField(max_length=200)
    anio_graduacion = models.PositiveIntegerField()
    indice_academico = models.DecimalField(max_digits=4, decimal_places=2)
    
    estado_validacion = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    class Meta:
        verbose_name = "Historial Académico"
        verbose_name_plural = "Historiales Académicos"

    def __str__(self):
        return f"Título de {self.egresado} - {self.estado_validacion}"
