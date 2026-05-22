from rest_framework import generics, permissions
from .models import EgresadoProfile, EmpresaProfile
from .serializers import EgresadoProfileSerializer, EmpresaProfileSerializer

class EgresadoProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = EgresadoProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = EgresadoProfile.objects.get_or_create(user=self.request.user)
        return profile

class EmpresaProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = EmpresaProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = EmpresaProfile.objects.get_or_create(user=self.request.user)
        return profile
