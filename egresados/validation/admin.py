from django.contrib import admin
from .models import AcademicRecord

@admin.register(AcademicRecord)
class AcademicRecordAdmin(admin.ModelAdmin):
    list_display = ('egresado', 'carrera', 'anio_graduacion', 'estado_validacion')
    list_filter = ('estado_validacion',)
    search_fields = ('egresado__nombre', 'egresado__apellido', 'carrera')
