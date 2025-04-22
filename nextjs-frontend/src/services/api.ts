import axios from 'axios';
import { Resource, FavoriteResponse } from '../types';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? 'http://localhost:1337';
const FAVORITES_API_URL = process.env.NEXT_PUBLIC_FAVORITES_API_URL ?? 'http://localhost:3001';
const TEST_USER_ID = 'testUser123';

// Configuración de Axios para Strapi
const strapiApi = axios.create({
  baseURL: `${STRAPI_API_URL}/api`,
  headers: { 'Content-Type': 'application/json' }
});

// Configuración de Axios para el servicio de favoritos
const favoritesApi = axios.create({
  baseURL: FAVORITES_API_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Caché para los recursos
const CACHE_VALIDITY = 5 * 60 * 1000;
let resourcesCache = {
  data: null as Resource[] | null,
  timestamp: 0,
  lastModified: null as string | null
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Error de API:', error.response?.data ?? error.message);
    if (error.code === 'ECONNREFUSED') {
      throw new Error('Error de conexión con el servidor');
    }
  }
  throw error;
};

// Función para verificar si el caché es válido
const isCacheValid = (): boolean => {
  const now = Date.now();
  return resourcesCache.data !== null && 
         (now - resourcesCache.timestamp) < CACHE_VALIDITY;
};

export const getResources = async (forceRefresh: boolean = false): Promise<Resource[]> => {
  try {
    // Si no forzamos la actualización y el caché es válido, devolvemos los datos en caché
    if (!forceRefresh && isCacheValid()) {
      return resourcesCache.data!;
    }

    // Obtenemos los headers para verificar si hay cambios
    const headersResponse = await strapiApi.head('recurso-aprendizajes');
    const lastModified = headersResponse.headers['last-modified'];

    // Si no forzamos la actualización y el contenido no ha cambiado, devolvemos el caché
    if (!forceRefresh && 
        resourcesCache.lastModified === lastModified && 
        resourcesCache.data !== null) {
      resourcesCache.timestamp = Date.now(); // Actualizamos el timestamp
      return resourcesCache.data;
    }

    // Si necesitamos actualizar, hacemos la petición completa
    const response = await strapiApi.get('recurso-aprendizajes', {
      params: {
        populate: '*'
      }
    });

    // Actualizamos el caché
    resourcesCache = {
      data: response.data.data,
      timestamp: Date.now(),
      lastModified: lastModified
    };

    return response.data.data;
  } catch (error) {
    // Si hay un error y tenemos datos en caché, devolvemos los datos en caché
    if (resourcesCache.data !== null) {
      console.warn('Error al obtener recursos, usando datos en caché:', error);
      return resourcesCache.data;
    }
    return handleError(error);
  }
};

export const getResourceById = async (id: number): Promise<Resource> => {
  try {
    const response = await strapiApi.get(`recurso-aprendizajes/${id}`, {
      params: {
        populate: '*'
      }
    });
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getFavoriteStatus = async (resourceId: number): Promise<FavoriteResponse> => {
  try {
    const response = await favoritesApi.get(`/favorites/${TEST_USER_ID}/${resourceId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const toggleFavorite = async (resourceId: number): Promise<FavoriteResponse> => {
  try {
    // Primero verificamos si es favorito
    const statusResponse = await favoritesApi.get(`/favorites/${TEST_USER_ID}/${resourceId}`);
    const isFavorite = statusResponse.data.data.isFavorite;

    // Luego lo añadimos o eliminamos según corresponda
    if (isFavorite) {
      await favoritesApi.delete(`/favorites/${TEST_USER_ID}/${resourceId}`);
    } else {
      await favoritesApi.post(`/favorites/${TEST_USER_ID}/${resourceId}`);
    }

    // Devolvemos el nuevo estado
    return {
      success: true,
      message: isFavorite ? 'Recurso eliminado de favoritos' : 'Recurso añadido a favoritos',
      data: {
        isFavorite: !isFavorite
      }
    };
  } catch (error) {
    return handleError(error);
  }
}; 