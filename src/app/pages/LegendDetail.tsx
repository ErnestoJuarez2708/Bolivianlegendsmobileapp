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
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchLeyenda = async () => {
      if (!id) {
        setError("No se recibió ID de la leyenda");
        setLoading(false);
        return;
      }

      const numericId = parseInt(id);
      if (isNaN(numericId) || numericId <= 0) {
        setError(`ID inválido: "${id}"`);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/leyendas/${numericId}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}`);
        }

        const data = await response.json();
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

  const handleDemoDownload = async () => {
    if (!leyenda) {
      alert("La leyenda no está cargada aún.");
      return;
    }

    try {
      const response = await fetch(`/api/pagos/descargar-demo/${leyenda.id}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "No se pudo descargar la demo");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `demo-${leyenda.titulo.toLowerCase().replace(/\s+/g, '-')}.apk`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      alert("¡Demo descargada correctamente! Puedes instalarla en tu dispositivo Android.");
      
    } catch (err: any) {
      console.error("Error descargando demo:", err);
      alert(err.message || "Error al descargar la demo. Inténtalo de nuevo.");
    }
  };

  const handleFullClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar el juego completo.");
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

  if (error || !leyenda) {
    return (
      <div className="flex-1 flex items-center justify-center bg-stone-50 p-6">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4"> {error || "Leyenda no encontrada"}</p>
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
          <h1 className="absolute bottom-6 left-6 right-6 text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            {leyenda.titulo}
          </h1>
        </div>

        <div className="px-6 py-8">
          <p className="text-stone-700 text-lg leading-relaxed whitespace-pre-line">
            {leyenda.descripcion}
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-stone-50 border-t border-stone-200 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleDemoDownload}
            className="py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Gamepad2 size={20} />
            <span>Jugar Demo</span>
          </button>

          <button 
            onClick={handleFullClick}
            className="py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <CreditCard size={20} />
            <span>Completo ($2)</span>
          </button>
        </div>

        <Link 
          to={`/legend/${id}/comments`}
          className="mt-3 block text-center py-3 px-4 rounded-xl font-semibold transition-all active:scale-95 bg-stone-200 text-stone-800 hover:bg-stone-300"
        >
          <MessageCircle size={20} className="inline mr-2" />
          Ver Comentarios
        </Link>
      </div>
    </div>
  );
}