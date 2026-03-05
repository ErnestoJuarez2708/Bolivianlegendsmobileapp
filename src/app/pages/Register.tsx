import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowLeft } from 'lucide-react';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (formData.username.trim()) {
      login(formData.username);
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
            <h1 className="text-3xl font-serif font-bold text-amber-900 mb-2">Crear Cuenta</h1>
            <p className="text-stone-500 text-sm">Únete a la comunidad de Andes Móviles</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Nombre</label>
              <input 
                name="name"
                type="text" 
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Nombre de usuario</label>
              <input 
                name="username"
                type="text" 
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="juan_p"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Correo electrónico</label>
              <input 
                name="email"
                type="email" 
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="juan@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Contraseña</label>
              <input 
                name="password"
                type="password" 
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-sm font-medium text-stone-700 ml-1">Confirmar contraseña</label>
              <input 
                name="confirmPassword"
                type="password" 
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-800 transition-all shadow-md active:scale-95 mt-6"
            >
              <UserPlus size={20} />
              <span>Registrarse</span>
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-stone-500">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-amber-700 font-semibold hover:underline">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
