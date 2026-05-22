from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import MyTokenObtainPairView, RegisterEgresadoView, RegisterEmpresaView, UserDetailView

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/egresado/', RegisterEgresadoView.as_view(), name='register_egresado'),
    path('register/empresa/', RegisterEmpresaView.as_view(), name='register_empresa'),
    path('me/', UserDetailView.as_view(), name='user_detail'),
]
