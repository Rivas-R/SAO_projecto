import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'egresados_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from profiles.models import EgresadoProfile, EmpresaProfile
from jobs.models import JobOffer
from validation.models import AcademicRecord

User = get_user_model()

def create_mock_data():
    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@example.com', 'admin123', role='ADMIN')
        print("Superusuario 'admin' creado (password: admin123)")

    # 2. Empresa
    if not User.objects.filter(username='tech_solutions').exists():
        user_emp = User.objects.create_user('tech_solutions', 'info@tech.com', 'empresa123', role='EMPRESA')
        emp_prof = EmpresaProfile.objects.create(
            user=user_emp,
            nombre_empresa="Tech Solutions Panamá",
            ruc="123456-1-789",
            sector="Tecnología",
            descripcion="Empresa líder en desarrollo de software."
        )
        print("Empresa 'Tech Solutions' creada")

        # Job Offer
        JobOffer.objects.create(
            empresa=emp_prof,
            titulo="Desarrollador React Senior",
            descripcion="Buscamos experto en frontend con experiencia en React y TypeScript.",
            salario_min=2500,
            salario_max=3500,
            modalidad='HIBRIDO',
            estado='APROBADA'
        )
        print("Oferta laboral creada")

    # 3. Egresado
    if not User.objects.filter(username='maria_egresada').exists():
        user_egr = User.objects.create_user('maria_egresada', 'maria@example.com', 'egresado123', role='EGRESADO')
        egr_prof = EgresadoProfile.objects.create(
            user=user_egr,
            nombre="María",
            apellido="Rodríguez",
            cedula="8-888-8888",
            telefono="+507 6123-4567",
            direccion="Ciudad de Panamá",
            habilidades="React, Python, Django"
        )
        print("Egresado 'María Rodríguez' creado")

        # Academic Record
        AcademicRecord.objects.create(
            egresado=egr_prof,
            carrera="Ingeniería en Sistemas",
            titulo_obtenido="Licenciatura",
            anio_graduacion=2023,
            indice_academico=2.90,
            estado_validacion='VERIFICADO'
        )
        print("Récord académico verificado creado")

if __name__ == '__main__':
    create_mock_data()
