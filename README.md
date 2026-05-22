# EgresadosUP

Bienvenido a EgresadosUP. Una plataforma moderna y robusta diseñada para transformar la relación entre universidades, egresados y el sector empresarial.

Este proyecto integra un backend potente en Django con un frontend interactivo en React, ofreciendo una solución completa para la gestión de egresados y la intermediación laboral con verificación oficial.

---

## Características Principales

### Verificación de Títulos Real
Conexión directa con el Registro Nacional de Profesionistas (SEP México) para validar la autenticidad de títulos y cédulas profesionales en tiempo real.

### Bolsa de Trabajo Inteligente
*   Empresas: Publicación de vacantes con flujo de aprobación administrativa.
*   Egresados: Exploración de vacantes y postulación con un solo clic.

### Gestión de Perfiles
*   Perfiles detallados para egresados (CV, habilidades, experiencia).
*   Perfiles corporativos para empresas.

### Seguridad y Roles
*   Autenticación basada en JWT (JSON Web Tokens).
*   Tres niveles de acceso: Administrador, Empresa y Egresado.

---

## Stack Tecnológico

| Componente | Tecnología |
| :--- | :--- |
| Frontend | React 18, Vite, Tailwind CSS, shadcn/ui, TanStack Query |
| Backend | Django 6.0, Django REST Framework (DRF) |
| Auth | SimpleJWT |
| API Externa | SEP México (Apache Solr Endpoint) |
| Base de Datos | SQLite (Desarrollo) / PostgreSQL (Producción) |

---

## Estructura del Proyecto

*   `/egresados`: Backend de la aplicación (Django).
*   `/egresados-verify-plus-main`: Frontend de la aplicación (React).
*   `MANUAL.md`: Guía de instalación y uso paso a paso.
*   `ARQUITECTURA.md`: Detalles técnicos y diagramas del sistema.

---

## Inicio Rápido

### Requisitos
*   Python 3.10+
*   Node.js 20+ o Bun

### Instalación Rápida
1.  Backend:
    ```bash
    cd egresados
    python -m venv venv
    .\venv\Scripts\activate
    pip install -r requirements.txt
    python manage.py runserver
    ```
2.  Frontend:
    ```bash
    cd egresados-verify-plus-main
    npm install
    npm run dev
    ```

Accede a la aplicación en: http://localhost:8080

---

## Credenciales de Prueba
*   Admin: `admin` / `admin123`
*   Egresado: `maria_egresada` / `egresado123`
*   Empresa: `tech_solutions` / `empresa123`
