from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('identity.urls')),
    path('api/profiles/', include('profiles.urls')),
    path('api/jobs/', include('jobs.urls')),
    path('api/validation/', include('validation.urls')),
]
