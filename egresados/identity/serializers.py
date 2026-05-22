from rest_framework import serializers
from django.contrib.auth import get_user_model
from profiles.models import EgresadoProfile, EmpresaProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'first_name', 'last_name')

class RegisterEgresadoSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            role=User.Role.EGRESADO
        )
        return user

class RegisterEmpresaSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    nombre_empresa = serializers.CharField(write_only=True)
    ruc = serializers.CharField(write_only=True)
    sector = serializers.CharField(write_only=True)
    descripcion = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'nombre_empresa', 'ruc', 'sector', 'descripcion')

    def create(self, validated_data):
        # Extract empresa data
        empresa_data = {
            'nombre_empresa': validated_data.pop('nombre_empresa'),
            'ruc': validated_data.pop('ruc'),
            'sector': validated_data.pop('sector'),
            'descripcion': validated_data.pop('descripcion'),
        }
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data.get('email', ''),
            role=User.Role.EMPRESA
        )
        
        EmpresaProfile.objects.create(user=user, **empresa_data)
        return user
