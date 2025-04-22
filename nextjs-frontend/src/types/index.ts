export interface Resource {
  id: number;
  attributes: {
    titulo: string;
    descripcion: string | DescriptionBlock[];
    tipo_recurso: 'artículo' | 'video' | 'otro';
    url: string;
    imagen: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
        };
      }> | null;
    };
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

interface DescriptionBlock {
  type: string;
  children: Array<{
    type: string;
    text: string;
  }>;
}

export interface FavoriteResponse {
  success: boolean;
  message: string;
  data?: {
    isFavorite: boolean;
  };
} 