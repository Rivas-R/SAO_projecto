from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobOfferViewSet, ApplicationViewSet

router = DefaultRouter()
router.register(r'offers', JobOfferViewSet, basename='joboffer')
router.register(r'applications', ApplicationViewSet, basename='application')

urlpatterns = [
    path('', include(router.urls)),
]
