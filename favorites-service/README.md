# Servicio de Favoritos - Catálogo de Recursos de Aprendizaje

Microservicio desarrollado con NestJS para gestionar los recursos favoritos de los usuarios.

## Descripción

Este servicio proporciona una API REST para:
- Gestionar los recursos favoritos de los usuarios
- Verificar si un recurso es favorito
- Listar todos los recursos favoritos de un usuario

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

## Ejecución

Para desarrollo:
```bash
npm run start:dev
```

Para producción:
```bash
npm run build
npm run start:prod
```

## Estructura del Proyecto

```
src/
├── favorites/            # Módulo de favoritos
│   ├── favorites.controller.ts  # Controlador de favoritos
│   ├── favorites.service.ts     # Servicio de favoritos
│   └── favorites.module.ts      # Módulo de favoritos
├── main.ts              # Punto de entrada
└── app.module.ts        # Módulo principal
```

## API Endpoints

### Favoritos

- **Verificar favorito**
  - `GET /favorites/:userId/:resourceId`
  - Retorna el estado de favorito para un recurso específico

- **Toggle favorito**
  - `POST /favorites/:userId/:resourceId`
  - Marca un recurso como favorito
  - `DELETE /favorites/:userId/:resourceId`
  - Elimina un recurso de favoritos

- **Listar favoritos**
  - `GET /favorites/:userId`
  - Retorna todos los recursos favoritos de un usuario

## Tecnologías Utilizadas

- **Framework**: NestJS
- **Lenguaje**: TypeScript
- **Base de Datos**: In-memory (Map)
- **Validación**: Class Validator
- **Documentación**: Swagger (pendiente)

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
