from django.db import models
from profiles.models import EmpresaProfile, EgresadoProfile

class JobOffer(models.Model):
    class Modality(models.TextChoices):
        REMOTE = 'REMOTO', 'Remoto'
        PRESENCIAL = 'PRESENCIAL', 'Presencial'
        HIBRIDO = 'HIBRIDO', 'Híbrido'

    class Status(models.TextChoices):
        PENDING = 'PENDIENTE', 'Pendiente de Aprobación'
        APPROVED = 'APROBADA', 'Aprobada'
        CLOSED = 'CERRADA', 'Cerrada'

    empresa = models.ForeignKey(EmpresaProfile, on_delete=models.CASCADE, related_name='job_offers')
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    salario_min = models.DecimalField(max_digits=10, decimal_places=2)
    salario_max = models.DecimalField(max_digits=10, decimal_places=2)
    modalidad = models.CharField(max_length=20, choices=Modality.choices)
    ubicacion = models.CharField(max_length=200, default="Panamá")
    fecha_publicacion = models.DateTimeField(auto_now_add=True)
    
    estado = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    class Meta:
        verbose_name = "Oferta Laboral"
        verbose_name_plural = "Ofertas Laborales"

    def __str__(self):
        return f"{self.titulo} - {self.empresa}"

class Application(models.Model):
    job_offer = models.ForeignKey(JobOffer, on_delete=models.CASCADE, related_name='applications')
    egresado = models.ForeignKey(EgresadoProfile, on_delete=models.CASCADE, related_name='applications')
    fecha_postulacion = models.DateTimeField(auto_now_add=True)
    mensaje = models.TextField(blank=True, null=True)

    class Meta:
        unique_together = ('job_offer', 'egresado')
        verbose_name = "Postulación"
        verbose_name_plural = "Postulaciones"

    def __str__(self):
        return f"{self.egresado} -> {self.job_offer}"
