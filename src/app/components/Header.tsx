import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { UserCircle, LogOut } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-amber-900 text-amber-50 shadow-md px-4 py-3 sticky top-0 z-50 flex justify-between items-center">
      <Link to="/catalog" className="text-xl font-serif font-bold tracking-wide">
        Andes Móviles
      </Link>
      
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-800/50 px-3 py-1.5 rounded-full">
              <UserCircle size={20} className="text-amber-200" />
              <span className="text-sm font-medium hidden sm:inline-block">{user.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-amber-200 hover:text-white p-1.5 rounded-full transition-colors"
              title="Cerrar sesión"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm font-medium">
            <Link to="/login" className="hover:text-amber-200 transition-colors">
              Iniciar Sesión
            </Link>
            <span className="hidden sm:inline-block text-amber-500">|</span>
            <Link to="/register" className="hover:text-amber-200 transition-colors">
              Crearse una cuenta
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
