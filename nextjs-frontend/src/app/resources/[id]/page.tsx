'use client';

import { getResourceById, getFavoriteStatus, toggleFavorite } from '../../../services/api';
import { FaHeart } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Resource } from '../../../types';
import Image from 'next/image';

interface ResourcePageProps {
  params: {
    id: string;
  };
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const [resource, setResource] = useState<Resource | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const resourceData = await getResourceById(parseInt(params.id));
        const favoriteData = await getFavoriteStatus(parseInt(params.id));
        
        if (isMounted) {
          setResource(resourceData);
          setIsFavorite(favoriteData.data?.isFavorite || false);
        }
      } catch (error) {
        if (isMounted) {
          setError('Error al cargar el recurso. Por favor, intenta de nuevo más tarde.');
          console.error('Error fetching resource:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [params.id]);

  const handleFavoriteClick = async () => {
    try {
      const response = await toggleFavorite(parseInt(params.id));
      if (response.success) {
        setIsFavorite(response.data?.isFavorite || false);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Recurso no encontrado</h1>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            ← Volver a la lista
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = resource.attributes.imagen?.data?.[0]?.attributes?.url;
  const getFullImageUrl = (url: string | undefined) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${url}`;
  };
  
  const descripcion = typeof resource.attributes.descripcion === 'string' 
    ? resource.attributes.descripcion 
    : '';

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f2f2f7] to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-[#007aff] hover:text-[#0056b3] mb-6 transition-colors duration-300">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la lista
        </Link>
        
        <div className="ios-card overflow-hidden">
          {imageUrl && (
            <div className="relative w-full h-72 mb-6">
              <Image
                src={getFullImageUrl(imageUrl)}
                alt={resource.attributes.titulo || ''}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}
          
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-4xl font-bold text-[#1c1c1e] tracking-tight">{resource.attributes.titulo || ''}</h1>
              <button
                onClick={handleFavoriteClick}
                className={`glass-effect w-12 h-12 rounded-full flex items-center justify-center ${
                  isFavorite ? 'text-[#ff3b30]' : 'text-gray-300'
                } hover:scale-110 transition-all duration-300`}
              >
                <FaHeart className="text-2xl" />
              </button>
            </div>

            <div className="flex items-center text-sm text-[#8e8e93] mb-6">
              <span className="glass-effect px-4 py-2 rounded-full capitalize">{resource.attributes.tipo_recurso}</span>
              <span className="mx-2">•</span>
              <span>{new Date(resource.attributes.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <div className="prose max-w-none">
              <p className="text-[#8e8e93] mb-8 text-lg leading-relaxed">{descripcion}</p>
              {resource.attributes.url && (
                <a 
                  href={resource.attributes.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ios-button inline-flex items-center hover:scale-105"
                >
                  Ver recurso
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 