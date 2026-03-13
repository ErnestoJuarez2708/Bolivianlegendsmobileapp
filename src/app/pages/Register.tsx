import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.username.trim()) {
      setError('El nombre de usuario es requerido');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nombre: formData.username.trim(),   // ← Enviamos como "nombre" para que el backend lo entienda
        email: formData.email.trim(),
        password: formData.password,
      };

      const response = await axios.post(`${API_URL}/api/auth/register`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);

      // El backend no devuelve "user" con username, así que usamos lo que ingresó el usuario
      login(formData.username);

      navigate('/catalog');

    } catch (err: any) {
      console.error('Error en el registro:', err);

      let errorMessage = 'Ocurrió un error al registrarse. Intenta nuevamente.';

      if (err.response) {
        const backendError = err.response.data?.message || err.response.data?.error;
        if (backendError) {
          errorMessage = backendError;
        } else if (err.response.status === 409) {
          errorMessage = 'El email ya está en uso';
        } else if (err.response.status === 400) {
          errorMessage = 'Datos inválidos. Verifica los campos';
        }
      } else if (err.request) {
        errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión o si el backend está corriendo';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
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

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={loading}
              className={`w-full bg-amber-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-800 transition-all shadow-md active:scale-95 mt-6 ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <UserPlus size={20} />
              <span>{loading ? 'Creando cuenta...' : 'Registrarse'}</span>
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