from django.contrib import admin
from .models import EgresadoProfile, EmpresaProfile

@admin.register(EgresadoProfile)
class EgresadoProfileAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'apellido', 'cedula', 'user')
    search_fields = ('nombre', 'apellido', 'cedula')

@admin.register(EmpresaProfile)
class EmpresaProfileAdmin(admin.ModelAdmin):
    list_display = ('nombre_empresa', 'ruc', 'sector', 'user')
    search_fields = ('nombre_empresa', 'ruc')
