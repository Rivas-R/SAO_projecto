from rest_framework import serializers
from .models import JobOffer, Application
from profiles.serializers import EmpresaProfileSerializer

class JobOfferSerializer(serializers.ModelSerializer):
    empresa_detalle = EmpresaProfileSerializer(source='empresa', read_only=True)
    
    class Meta:
        model = JobOffer
        fields = '__all__'
        read_only_fields = ('empresa', 'estado', 'fecha_publicacion')

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('egresado', 'fecha_postulacion')
