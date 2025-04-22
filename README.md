# Catálogo de Recursos de Aprendizaje

Este proyecto es un catálogo de recursos de aprendizaje que utiliza una arquitectura de microservicios. Consta de tres componentes principales:

1. **Backend de Contenido (Strapi)**: Gestiona el contenido de los recursos de aprendizaje.
2. **Frontend (Next.js)**: Interfaz de usuario para visualizar y gestionar los recursos.
3. **Servicio de Favoritos (NestJS)**: Microservicio independiente para gestionar los favoritos.

## Estructura del Proyecto

```
.
├── my-strapi-project/         # Backend de contenido (Strapi)
├── nextjs-frontend/          # Frontend (Next.js)
└── favorites-service/        # Servicio de favoritos (NestJS)
```

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- Git

## Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd [NOMBRE_DEL_REPOSITORIO]
   ```

2. **Instalar y ejecutar Strapi**:
   ```bash
   cd my-strapi-project
   npm install
   npm run develop
   ```

3. **Instalar y ejecutar el servicio de favoritos**:
   ```bash
   cd favorites-service
   npm install
   npm run start:dev
   ```

4. **Instalar y ejecutar el frontend**:
   ```bash
   cd nextjs-frontend
   npm install
   npm run dev
   ```

## Acceso a las Aplicaciones

- **Strapi Admin**: http://localhost:1337/admin
- **Frontend**: http://localhost:3000
- **API de Favoritos**: http://localhost:3001

## Características

- Gestión de recursos de aprendizaje (artículos, videos, etc.)
- Sistema de favoritos
- Interfaz moderna y responsive
- Optimización de rendimiento con caché
- Manejo de errores y estados de carga

## Tecnologías Utilizadas

- **Backend**: Strapi v4
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Microservicio**: NestJS, TypeScript

## Estructura de la API

### Strapi
- GET /api/recurso-aprendizajes - Lista todos los recursos
- GET /api/recurso-aprendizajes/:id - Obtiene un recurso específico

### Servicio de Favoritos
- GET /favorites/:userId - Lista favoritos de un usuario
- POST /favorites/:userId/:resourceId - Añade a favoritos
- DELETE /favorites/:userId/:resourceId - Elimina de favoritos
- GET /favorites/:userId/:resourceId - Verifica estado de favorito

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 