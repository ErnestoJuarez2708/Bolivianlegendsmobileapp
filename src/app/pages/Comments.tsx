import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Send, Star } from 'lucide-react';

interface Comment {
  id: number;
  texto: string;
  rating: number;
  created_at: string;
  usuario: {
    nombre: string;
  };
}

export function Comments() {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [id]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comentarios/${id}`);
      
      if (!response.ok) throw new Error('Error al cargar comentarios');
      
      const data = await response.json();
      setComments(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los comentarios');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !id) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          leyenda_id: id,
          texto: newComment.trim(),
          rating: rating
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar comentario');
      }

      const newComentario = await response.json();
      
      setComments([newComentario, ...comments]);
      setNewComment('');
      setRating(5);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-stone-50 overflow-hidden relative">
      <header className="flex items-center gap-4 bg-amber-900 text-amber-50 px-4 py-4 shadow-md sticky top-0 z-20">
        <Link 
          to={`/legend/${id}`} 
          className="text-amber-200 hover:text-white transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-serif font-bold tracking-wide">Comentarios y Opiniones</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {loading ? (
          <p className="text-center text-stone-500">Cargando comentarios...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-stone-500 py-8">Aún no hay comentarios. ¡Sé el primero!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                    <User size={16} />
                  </div>
                  <span className="font-semibold text-stone-800">
                    {comment.usuario?.nombre || 'Usuario'}
                  </span>
                </div>
                <span className="text-xs text-stone-400">
                  {new Date(comment.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < comment.rating ? "text-amber-500 fill-amber-500" : "text-stone-300"} 
                  />
                ))}
              </div>
              
              <p className="text-stone-600 text-sm leading-relaxed">{comment.texto}</p>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 border-t border-stone-200 sticky bottom-0 z-20 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
        {user ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-medium text-stone-600">Tu calificación:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={22} 
                      className={star <= rating ? "text-amber-500 fill-amber-500" : "text-stone-300 hover:text-amber-400"} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Escribe tu opinión sobre la leyenda o el juego..."
                className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={submitting}
              />
              <button 
                type="submit"
                disabled={!newComment.trim() || submitting}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-lg bg-amber-600 text-white disabled:bg-stone-300 disabled:text-stone-500 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 bg-stone-100 rounded-xl">
            <p className="text-stone-600 mb-3">Debes iniciar sesión para dejar un comentario.</p>
            <Link to="/login" className="text-amber-700 font-semibold hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}