'use client';

import { getResources } from '../services/api';
import ResourceCard from '../components/ResourceCard';
import { useState, useEffect, useCallback } from 'react';
import { Resource } from '../types';
import { FaSearch, FaGraduationCap, FaSync } from 'react-icons/fa';

export default function Home() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchResources = useCallback(async (forceRefresh: boolean = false) => {
    try {
      if (forceRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }
      const data = await getResources(forceRefresh);
      setResources(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los recursos');
      setResources([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();

    // Configurar revalidación periódica cada 5 minutos
    const interval = setInterval(() => {
      fetchResources(true);
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchResources]);

  const handleRefresh = () => {
    fetchResources(true);
  };

  const filteredResources = resources.filter(resource =>
    resource.attributes.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.attributes.tipo_recurso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaGraduationCap className="text-[#007aff] text-3xl" />
                <span className="text-xl font-semibold text-[#1c1c1e]">Recursos de Aprendizaje</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007aff]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef]">
        <nav className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaGraduationCap className="text-[#007aff] text-3xl" />
                <span className="text-xl font-semibold text-[#1c1c1e]">Recursos de Aprendizaje</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#ff3b30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1c1c1e] mb-4">No se pudieron cargar los recursos</h2>
              <div className="text-[#8e8e93] mb-8">
                {error.includes('ECONNREFUSED') ? (
                  <>
                    <p className="mb-4">No se pudo conectar con el servidor. Por favor, verifica que:</p>
                    <ul className="space-y-3 text-left max-w-md mx-auto bg-gray-50 p-6 rounded-xl">
                      <li className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-[#007aff] rounded-full"></span>
                        <span>El servidor de Strapi esté corriendo en el puerto 1337</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-[#007aff] rounded-full"></span>
                        <span>El servidor de Favoritos esté corriendo en el puerto 3001</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-2 h-2 bg-[#007aff] rounded-full"></span>
                        <span>Tu conexión a internet esté funcionando</span>
                      </li>
                    </ul>
                  </>
                ) : (
                  error
                )}
              </div>
              <button 
                onClick={() => window.location.reload()} 
                className="inline-flex items-center justify-center bg-[#007aff] text-white px-8 py-3 rounded-full hover:bg-[#0056b3] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2f2f7] to-white">
      <nav className="ios-blur sticky top-0 z-50 border-b border-gray-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <FaGraduationCap className="text-[#007aff] text-3xl" />
              <span className="text-xl font-semibold text-[#1c1c1e]">Recursos de Aprendizaje</span>
            </div>
            <div className="relative flex-1 md:max-w-md">
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ios-input pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full glass-effect transition-all duration-300 ${
                  isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                <FaSync className={`text-[#007aff] ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="text-sm text-[#1c1c1e]">Actualizar</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {filteredResources.length === 0 ? (
          <div className="ios-card text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#8e8e93]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#1c1c1e] mb-2">No hay recursos disponibles</h2>
            <p className="text-[#8e8e93] text-lg">
              {searchTerm ? 'No se encontraron recursos que coincidan con tu búsqueda.' : 'Aún no hay recursos agregados.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
