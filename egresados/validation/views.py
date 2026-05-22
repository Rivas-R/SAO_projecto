import requests
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AcademicRecord
from .serializers import AcademicRecordSerializer
from profiles.models import EgresadoProfile

class AcademicRecordDetailView(generics.RetrieveAPIView):
    serializer_class = AcademicRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        if self.request.user.role != 'EGRESADO':
            return None
        egresado_profile = EgresadoProfile.objects.get(user=self.request.user)
        record, created = AcademicRecord.objects.get_or_create(
            egresado=egresado_profile,
            defaults={'carrera': 'Pendiente', 'titulo_obtenido': 'Pendiente', 'anio_graduacion': 2024, 'indice_academico': 0.0}
        )
        return record

class AcademicRecordAdminUpdateView(generics.UpdateAPIView):
    queryset = AcademicRecord.objects.all()
    serializer_class = AcademicRecordSerializer
    permission_classes = [permissions.IsAdminUser]

class VerifySEPView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({"error": "Se requiere un parámetro de consulta 'q' (nombre o cédula)"}, status=status.HTTP_400_BAD_REQUEST)

        # URL del motor de búsqueda de la SEP (Apache Solr)
        url = "http://search.sep.gob.mx/solr/cedulasCore/select"
        params = {
            'q': query,
            'wt': 'json',
            'indent': 'true',
            'rows': 10  # Limitar a 10 resultados por simplicidad
        }

        try:
            response = requests.get(url, params=params, timeout=5)
            response.raise_for_status()
            data = response.json()
            
            docs = data.get('response', {}).get('docs', [])
            results = []
            for doc in docs:
                results.append({
                    'nombre': doc.get('nombre', ''),
                    'paterno': doc.get('paterno', ''),
                    'materno': doc.get('materno', ''),
                    'titulo': doc.get('titulo', ''),
                    'cedula': doc.get('numCedula', ''),
                    'institucion': doc.get('institucion', ''),
                    'anio': doc.get('anio', '')
                })

            return Response({
                "source": "SEP_REAL",
                "count": data.get('response', {}).get('numFound', 0),
                "results": results
            })
        except (requests.exceptions.RequestException, Exception) as e:
            # FALLBACK: Si la SEP falla, devolvemos datos de prueba para que la app no se rompa
            print(f"DEBUG: Error conectando a SEP: {e}. Usando modo demostración.")
            
            # Solo devolvemos resultados si la búsqueda coincide con algo conocido para la demo
            mock_results = [
                {
                    'nombre': 'ANDRES MANUEL',
                    'paterno': 'LOPEZ',
                    'materno': 'OBRADOR',
                    'titulo': 'LICENCIATURA EN CIENCIAS POLITICAS Y ADMINISTRACION PUBLICA',
                    'cedula': '1130386',
                    'institucion': 'UNIVERSIDAD NACIONAL AUTONOMA DE MEXICO',
                    'anio': '1987'
                }
            ]
            
            # Si el usuario buscó por la cédula de AMLO o su nombre
            search_q = query.upper()
            if "ANDRES" in search_q or "OBRADOR" in search_q or "1130386" in search_q:
                return Response({
                    "source": "DEMO_MODE",
                    "note": "El servidor de la SEP no respondió. Mostrando datos de caché/demo.",
                    "count": 1,
                    "results": mock_results
                })
            
            return Response({
                "source": "ERROR",
                "error": "El servicio de la SEP está temporalmente fuera de línea. Intente más tarde."
            }, status=status.HTTP_502_BAD_GATEWAY)
