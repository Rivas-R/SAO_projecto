from rest_framework import serializers
from .models import EgresadoProfile, EmpresaProfile

class EgresadoProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EgresadoProfile
        fields = '__all__'
        read_only_fields = ('user',)

class EmpresaProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmpresaProfile
        fields = '__all__'
        read_only_fields = ('user',)
