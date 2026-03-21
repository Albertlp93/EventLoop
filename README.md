# KONECTO

Plataforma web de ofertas y demandas de empleo desarrollada con HTML5, CSS3, JavaScript y Bootstrap.

## Descripción

KONECTO conecta a personas que buscan empleo con empresas que ofrecen oportunidades laborales. Los usuarios pueden publicar ofertas (empresas) y demandas (candidatos), gestionar usuarios y autenticarse en la plataforma.

## Estructura del proyecto

```
konecto/
├── index.html          # Dashboard principal
├── login.html          # Inicio de sesión
├── empleos.html        # Alta y gestión de ofertas/demandas
├── usuarios.html       # Alta y gestión de usuarios
├── css/
│   └── estilos.css     # Estilos personalizados
└── js/
    ├── datos.js        # Datos compartidos (usuarios y empleos)
    ├── dashboard.js    # Lógica del dashboard
    ├── login.js        # Lógica de autenticación
    ├── empleos.js      # CRUD de ofertas y demandas
    └── usuarios.js     # CRUD de usuarios
```

## Tecnologías

- **HTML5** — Estructura semántica
- **CSS3** — Variables CSS, Flexbox, diseño responsive
- **JavaScript ES6+** — Módulos, manipulación del DOM, sessionStorage
- **Bootstrap 5.3** — Grid system, componentes UI
- **Google Fonts** — Tipografía Nunito

## Cómo usar

1. Clona el repositorio
2. Abre `index.html` en un servidor local (necesario para módulos ES6)
3. Usuarios de prueba disponibles en `js/datos.js`

> **Nota:** Al usar módulos JS (`import/export`), es necesario servir los archivos desde un servidor local (Live Server, http-server, etc.).

## Funcionalidades

- **Dashboard:** Visualización de ofertas y demandas en tarjetas
- **Login:** Autenticación con sessionStorage
- **Empleos:** Alta y baja de ofertas y demandas laborales
- **Usuarios:** Registro y eliminación de usuarios

## Equipo

Proyecto grupal desarrollado para la asignatura FP.450 — Desarrollo full stack de soluciones web con JavaScript y servicios web (UOC).

## Licencia

Proyecto académico — Todos los derechos reservados.
