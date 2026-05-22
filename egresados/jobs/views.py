from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import JobOffer, Application
from .serializers import JobOfferSerializer, ApplicationSerializer
from profiles.models import EmpresaProfile, EgresadoProfile

class JobOfferViewSet(viewsets.ModelViewSet):
    serializer_class = JobOfferSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'EMPRESA':
            return JobOffer.objects.filter(empresa__user=user)
        elif user.role == 'ADMIN':
            return JobOffer.objects.all()
        else:
            # Egresados only see approved offers
            return JobOffer.objects.filter(estado=JobOffer.Status.APPROVED)

    def perform_create(self, serializer):
        empresa_profile = EmpresaProfile.objects.get(user=self.request.user)
        serializer.save(empresa=empresa_profile)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def postular(self, request, pk=None):
        job_offer = self.get_object()
        if request.user.role != 'EGRESADO':
            return Response({"error": "Solo egresados pueden postularse"}, status=status.HTTP_403_FORBIDDEN)
        
        egresado_profile = EgresadoProfile.objects.get(user=request.user)
        
        application, created = Application.objects.get_or_create(
            job_offer=job_offer,
            egresado=egresado_profile,
            defaults={'mensaje': request.data.get('mensaje', '')}
        )
        
        if not created:
            return Response({"error": "Ya te has postulado a esta vacante"}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response({"message": "Postulación exitosa"}, status=status.HTTP_201_CREATED)

class ApplicationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'EMPRESA':
            return Application.objects.filter(job_offer__empresa__user=user)
        elif user.role == 'EGRESADO':
            return Application.objects.filter(egresado__user=user)
        return Application.objects.all()
