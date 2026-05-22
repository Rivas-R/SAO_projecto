from django.contrib import admin
from .models import JobOffer, Application

@admin.register(JobOffer)
class JobOfferAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'empresa', 'modalidad', 'estado', 'fecha_publicacion')
    list_filter = ('estado', 'modalidad')
    search_fields = ('titulo', 'descripcion')
    actions = ['approve_offers']

    def approve_offers(self, request, queryset):
        queryset.update(estado=JobOffer.Status.APPROVED)
    approve_offers.short_description = "Aprobar ofertas seleccionadas"

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('egresado', 'job_offer', 'fecha_postulacion')
