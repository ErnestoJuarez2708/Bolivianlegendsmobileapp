import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CreditCard, Lock, CheckCircle2 } from 'lucide-react';

export function Payment() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-50 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-800 mb-2">¡Pago Exitoso!</h1>
        <p className="text-stone-600 mb-8">Gracias por tu compra. La descarga del juego completo ha comenzado.</p>
        <button 
          onClick={() => navigate('/catalog')}
          className="bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold hover:bg-amber-800 transition-colors"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-stone-50 overflow-y-auto">
      <header className="flex items-center gap-4 bg-white px-4 py-4 shadow-sm sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="text-stone-500 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2 text-stone-800">
          <Lock size={16} className="text-green-600" />
          <h1 className="text-lg font-semibold">Pago Seguro</h1>
        </div>
      </header>

      <div className="p-4 flex-1 flex flex-col max-w-md mx-auto w-full">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 mb-6 mt-4">
          <h2 className="text-sm text-stone-500 mb-1">Total a pagar</h2>
          <div className="text-3xl font-bold text-stone-800">$2.00 USD</div>
          <div className="text-sm text-stone-500 mt-2">Juego Completo: La Leyenda del Lago Titicaca</div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Número de Tarjeta</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full pl-10 pr-4 py-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                required
                maxLength={19}
              />
              <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-stone-700">Vencimiento</label>
              <input 
                type="text" 
                placeholder="MM/YY" 
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                required
                maxLength={5}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-stone-700">CVC</label>
              <input 
                type="text" 
                placeholder="123" 
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                required
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-stone-700">Nombre en la tarjeta</label>
            <input 
              type="text" 
              placeholder="Juan Pérez" 
              className="w-full px-4 py-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isProcessing}
            className="w-full mt-6 bg-stone-900 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors disabled:bg-stone-400"
          >
            {isProcessing ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock size={18} />
                Pagar $2.00
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 flex justify-center gap-2 opacity-50">
          <div className="w-10 h-6 bg-stone-300 rounded" />
          <div className="w-10 h-6 bg-stone-300 rounded" />
          <div className="w-10 h-6 bg-stone-300 rounded" />
        </div>
      </div>
    </div>
  );
}
