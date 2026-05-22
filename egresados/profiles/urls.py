from django.urls import path
from .views import EgresadoProfileDetailView, EmpresaProfileDetailView

urlpatterns = [
    path('egresado/', EgresadoProfileDetailView.as_view(), name='egresado_profile'),
    path('empresa/', EmpresaProfileDetailView.as_view(), name='empresa_profile'),
]
