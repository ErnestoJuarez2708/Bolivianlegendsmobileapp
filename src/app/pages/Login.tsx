import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { LogIn, ArrowLeft } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate('/catalog');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-stone-50 overflow-y-auto relative">
      <header className="absolute top-0 left-0 p-4">
        <button 
          onClick={() => navigate(-1)}
          className="text-stone-500 hover:text-stone-800 transition-colors bg-white rounded-full p-2 shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
      </header>

      <div className="flex-1 flex items-center justify-center p-6 mt-16 pb-32">
        <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-lg border border-stone-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">Bienvenido de vuelta</h1>
            <p className="text-stone-500 text-sm">Inicia sesión para descubrir y comentar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Usuario</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="Ej. Pachacutec99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Contraseña</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-800 transition-all shadow-md active:scale-95 mt-6"
            >
              <LogIn size={20} />
              <span>Ingresar</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-500">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-amber-700 font-semibold hover:underline">
              Crearse una cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
