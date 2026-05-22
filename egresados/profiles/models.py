from django.db import models
from django.conf import settings

class EgresadoProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='egresado_profile')
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=20)
    direccion = models.TextField()
    
    # Profesional
    empresa_actual = models.CharField(max_length=100, blank=True, null=True)
    cargo_actual = models.CharField(max_length=100, blank=True, null=True)
    habilidades = models.TextField(help_text="Lista de habilidades separadas por comas")
    anios_experiencia = models.PositiveIntegerField(default=0)
    
    class Meta:
        verbose_name = "Perfil de Egresado"
        verbose_name_plural = "Perfiles de Egresados"

    def __str__(self):
        return f"{self.nombre} {self.apellido}"

class EmpresaProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='empresa_profile')
    nombre_empresa = models.CharField(max_length=200)
    ruc = models.CharField(max_length=50, unique=True)
    sector = models.CharField(max_length=100)
    descripcion = models.TextField()
    sitio_web = models.URLField(blank=True, null=True)
    
    class Meta:
        verbose_name = "Perfil de Empresa"
        verbose_name_plural = "Perfiles de Empresas"

    def __str__(self):
        return self.nombre_empresa
