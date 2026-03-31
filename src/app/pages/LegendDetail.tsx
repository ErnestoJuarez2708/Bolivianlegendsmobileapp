import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Gamepad2, ArrowLeft, CreditCard } from 'lucide-react';

export function LegendDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [leyenda, setLeyenda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("📍 useParams id recibido:", id);
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchLeyenda = async () => {
      console.log("Intentando cargar leyenda con id:", id);

      if (!id) {
        setError("No se recibió ID de la leyenda");
        setLoading(false);
        return;
      }

      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        setError(`ID inválido: "${id}". Se esperaba un número.`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/leyendas/${numericId}`);

        console.log(`📡 Respuesta del servidor: ${response.status} ${response.statusText}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();
        console.log("Leyenda cargada:", data);
        setLeyenda(data);
      } catch (err: any) {
        console.error("Error al cargar leyenda:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeyenda();
  }, [id]);

  const handleFullClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar el juego.");
      navigate('/login');
      return;
    }
    navigate('/payment');
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-stone-600">Cargando leyenda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50 p-6">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">⚠️ {error}</p>
          <p className="text-stone-500 text-sm mb-6">
            ID recibido: <strong>{id || "undefined"}</strong>
          </p>
          <Link 
            to="/catalog" 
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-xl hover:bg-amber-800"
          >
            ← Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-stone-50" ref={scrollRef}>
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <Link 
          to="/catalog" 
          className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="relative h-72 md:h-96 w-full">
          <img 
            src={leyenda.imagen_url} 
            alt={leyenda.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          <h1 className="absolute bottom-6 left-6 right-6 text-3xl md:text-4xl font-serif font-bold text-white">
            {leyenda.titulo}
          </h1>
        </div>

        <div className="px-6 py-8">
          <div className="prose prose-stone max-w-none space-y-4">
              <p className="text-stone-700 text-lg leading-relaxed font-sans first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-700 first-line:tracking-widest first-line:uppercase">
                {leyenda.descripcion}
              </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-stone-50 border-t p-4">
        <div className="grid grid-cols-2 gap-3">
          <button className="py-3 bg-amber-100 text-amber-900 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Gamepad2 size={20} /> Jugar Demo
          </button>
          <button 
            onClick={handleFullClick}
            className="py-3 bg-amber-700 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <CreditCard size={20} /> Completo ($2)
          </button>
        </div>
         <Link 
            to={`/legend/${id}/comments`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all active:scale-95 bg-stone-200 text-stone-800 hover:bg-stone-300"
          >
            <MessageCircle size={20} />
            <span>Ver Comentarios</span>
          </Link>
      </div>
    </div>
  );
}