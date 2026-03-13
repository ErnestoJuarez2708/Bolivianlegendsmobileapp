import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, User, Send, Star } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  text: string;
  rating: number;
  date: string;
}

const INITIAL_COMMENTS: Comment[] = [
  { id: 1, user: 'Pachacutec99', text: '¡Increíble leyenda! Me encantó el juego, los gráficos del demo son brutales.', rating: 5, date: 'Hace 2 días' },
  { id: 2, user: 'AndeanTraveler', text: 'Buena adaptación del mito. El juego completo vale la pena.', rating: 4, date: 'Hace 1 semana' },
];

export function Comments() {
  const { id } = useParams();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now(),
      user: user.username,
      text: newComment,
      rating,
      date: 'Ahora mismo'
    };

    setComments([comment, ...comments]);
    setNewComment('');
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
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                  <User size={16} />
                </div>
                <span className="font-semibold text-stone-800">{comment.user}</span>
              </div>
              <span className="text-xs text-stone-400">{comment.date}</span>
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
            
            <p className="text-stone-600 text-sm leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border-t border-stone-200 sticky bottom-0 z-20 shadow-[0_-10px_20px_-15px_rgba(0,0,0,0.1)]">
        {user ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-sm font-medium text-stone-600">Tu calificación:</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      size={20} 
                      className={star <= rating ? "text-amber-500 fill-amber-500" : "text-stone-300 hover:text-amber-300"} 
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 relative">
              <input
                type="text"
                placeholder="Escribe tu opinión sobre la leyenda o juego..."
                className="flex-1 bg-stone-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all pr-12"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-amber-600 text-white disabled:bg-stone-300 disabled:text-stone-500 transition-colors"
              >
                <Send size={16} className="-ml-0.5 mt-0.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4 bg-stone-100 rounded-xl">
            <p className="text-sm text-stone-600 mb-3">Debes iniciar sesión para comentar.</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="text-amber-700 font-semibold text-sm hover:underline">Iniciar Sesión</Link>
              <span className="text-stone-300">|</span>
              <Link to="/register" className="text-amber-700 font-semibold text-sm hover:underline">Crear Cuenta</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
