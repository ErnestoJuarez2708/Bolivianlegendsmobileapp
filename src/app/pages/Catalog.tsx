import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';

export function Catalog() {
  const [leyendas, setLeyendas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeyendas = async () => {
      try {
        const response = await fetch('/api/leyendas');
        
        if (!response.ok) {
          throw new Error('Error al cargar las leyendas');
        }

        const data = await response.json();
        setLeyendas(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeyendas();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-100">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Cargando leyendas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-100 p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col relative bg-stone-100 p-4 pb-20 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-amber-700" size={24} />
        <h1 className="text-2xl font-serif font-bold text-stone-800">Leyendas de La Paz</h1>
      </div>
      
      <p className="text-stone-600 mb-6 text-sm md:text-base">
        Descubre las historias milenarias, mitos y tradiciones que envuelven a la ciudad maravilla y sus alrededores.
      </p>

      <div className="flex flex-col gap-5 relative z-10">
        {leyendas.map((leyenda) => (
          <Link
            key={leyenda.id}
            to={`/legend/${leyenda.id}`} 
            className="group relative h-56 w-full rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="absolute inset-0">
              <img 
                src={leyenda.imagen_url} 
                alt={leyenda.titulo}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300 mb-1 block">
                  Leyenda
                </span>
                <h2 className="text-2xl font-serif font-bold mb-1 leading-tight">{leyenda.titulo}</h2>
                <p className="text-sm text-stone-300 line-clamp-2">{leyenda.descripcion.substring(0, 120)}...</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                <ChevronRight size={20} className="text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {leyendas.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          No hay leyendas disponibles aún.
        </div>
      )}
      <div className="mt-8 text-center">
        <p className="text-stone-400 text-sm">Más sectores próximamente...</p>
      </div>
    </div>
  );
}