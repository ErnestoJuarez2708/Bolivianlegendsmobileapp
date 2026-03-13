import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import splashLogo from '../../assets/0cda4b9948014d0f4eb7a42481f55bed101e2c79.png';
export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/catalog', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-slate-900 to-slate-950 z-0 pointer-events-none" />
      <div className="z-10 animate-in fade-in zoom-in duration-1000 ease-out flex flex-col items-center p-6">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-amber-500/20 shadow-amber-900/50">
          <img 
            src={splashLogo} 
            alt="Andes Móviles Logo" 
            className="w-full h-full object-cover animate-[spin_30s_linear_infinite_reverse]" 
          />
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
