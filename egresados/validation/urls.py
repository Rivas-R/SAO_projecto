from django.urls import path
from .views import AcademicRecordDetailView, AcademicRecordAdminUpdateView, VerifySEPView

urlpatterns = [
    path('me/', AcademicRecordDetailView.as_view(), name='my_academic_record'),
    path('admin/update/<int:pk>/', AcademicRecordAdminUpdateView.as_view(), name='admin_update_record'),
    path('verify-sep/', VerifySEPView.as_view(), name='verify_sep'),
]
