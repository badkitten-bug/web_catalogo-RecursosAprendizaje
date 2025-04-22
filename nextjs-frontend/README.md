# Frontend - Catálogo de Recursos de Aprendizaje

Frontend desarrollado con Next.js, TypeScript y Tailwind CSS para el catálogo de recursos de aprendizaje.

## Descripción

Este proyecto es el frontend de la aplicación de catálogo de recursos de aprendizaje. Proporciona una interfaz moderna y responsive para:
- Visualizar todos los recursos disponibles
- Ver detalles de cada recurso
- Marcar/desmarcar recursos como favoritos
- Buscar recursos por título o tipo

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_FAVORITES_API_URL=http://localhost:3001
```

## Ejecución

Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm run build
npm run start
```

## Estructura del Proyecto

```
src/
├── app/                    # Páginas de la aplicación
│   ├── page.tsx           # Página principal
│   └── resources/         # Páginas de recursos
│       └── [id]/page.tsx  # Página de detalle
├── components/            # Componentes reutilizables
│   ├── ResourceCard.tsx   # Tarjeta de recurso
│   └── ...
├── services/             # Servicios de API
│   └── api.ts           # Cliente de API
├── types/               # Definiciones de tipos
│   └── index.ts        # Tipos de la aplicación
└── styles/             # Estilos globales
    └── globals.css     # Estilos globales
```

## Características

- **Diseño Moderno**: Interfaz limpia y moderna con Tailwind CSS
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Optimización de Rendimiento**:
  - Caché de recursos
  - Lazy loading de imágenes
  - Optimización de consultas
- **Manejo de Estados**:
  - Estados de carga
  - Manejo de errores
  - Feedback visual para acciones

## Tecnologías Utilizadas

- **Framework**: Next.js 14
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Gestión de Estado**: React Hooks
- **Cliente HTTP**: Axios

## API Integration

### Strapi
- Lista de recursos: `GET /api/recurso-aprendizajes`
- Detalle de recurso: `GET /api/recurso-aprendizajes/:id`

### Servicio de Favoritos
- Verificar favorito: `GET /favorites/:userId/:resourceId`
- Toggle favorito: `POST/DELETE /favorites/:userId/:resourceId`

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
