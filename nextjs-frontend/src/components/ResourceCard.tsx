'use client';

import { Resource } from '../types';
import Link from 'next/link';
import { FaHeart, FaBookOpen, FaVideo, FaFile } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { toggleFavorite, getFavoriteStatus } from '../services/api';
import Image from 'next/image';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkFavorite = async () => {
      try {
        const { success, data } = await getFavoriteStatus(resource.id);
        if (mounted && success) {
          setIsFavorite(data?.isFavorite || false);
        }
      } catch (err) {
        console.error('Error al verificar favorito:', err);
      }
    };

    checkFavorite();
    return () => { mounted = false; };
  }, [resource.id]);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const { success, data } = await toggleFavorite(resource.id);
      if (success) {
        setIsFavorite(data?.isFavorite || false);
      }
    } catch (err) {
      console.error('Error al actualizar favorito:', err);
    }
  };

  const getResourceIcon = () => {
    switch (resource.attributes.tipo_recurso.toLowerCase()) {
      case 'video':
        return <FaVideo className="text-[#007aff] text-xl" />;
      case 'artículo':
        return <FaBookOpen className="text-[#007aff] text-xl" />;
      default:
        return <FaFile className="text-[#007aff] text-xl" />;
    }
  };

  const getImageUrl = () => {
    const imageData = resource.attributes.imagen?.data?.[0];
    if (!imageData) return null;
    
    const url = imageData.attributes.url;
    if (url.startsWith('http')) return url;
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'}${url}`;
  };

  const imageUrl = getImageUrl();
  
  const descripcion = typeof resource.attributes.descripcion === 'string'
    ? resource.attributes.descripcion
    : Array.isArray(resource.attributes.descripcion)
      ? resource.attributes.descripcion
          .map(block => block.children?.[0]?.text)
          .filter(Boolean)
          .join(' ')
      : '';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="ios-card group hover-scale">
      <Link href={`/resources/${resource.id}`} className="block">
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={resource.attributes.titulo}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={handleImageError}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f2f2f7] to-[#e5e5ea]">
              {getResourceIcon()}
            </div>
          )}
          <button
            onClick={handleFavorite}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center glass-effect transition-all duration-300 ${
              isFavorite ? 'text-[#ff3b30]' : 'text-gray-400'
            } hover:scale-110`}
          >
            <FaHeart className="text-xl" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#1c1c1e] line-clamp-2 mb-2">
              {resource.attributes.titulo}
            </h2>
          </div>
          <p className="text-[#8e8e93] text-sm line-clamp-2 mb-4">{descripcion}</p>
          <div className="flex items-center text-sm text-[#8e8e93] space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full glass-effect">
              {getResourceIcon()}
              <span className="ml-2 capitalize">{resource.attributes.tipo_recurso}</span>
            </span>
            <span>•</span>
            <span>{new Date(resource.attributes.publishedAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</span>
          </div>
        </div>
      </Link>
    </div>
  );
} 