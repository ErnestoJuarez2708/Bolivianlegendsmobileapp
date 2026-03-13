import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MapPin } from 'lucide-react';

const LEGENDS = [
  {
    id: 'lago-titicaca',
    title: 'Lago Titicaca',
    subtitle: 'La leyenda inca de Manco Cápac y Mama Ocllo',
    image: 'https://images.unsplash.com/photo-1597681017981-c4654947c061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdGl0aWNhY2ElMjBib2xpdmlhfGVufDF8fHx8MTc3MjY3ODE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'tiwanaku',
    title: 'Tiwanaku',
    subtitle: 'El misterio de la Puerta del Sol',
    image: 'https://images.unsplash.com/photo-1664716915374-24473b3785d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXdhbmFrdSUyMHJ1aW50JTIwbGFwYXp8ZW58MXx8fDE3NzI2NzgxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'illimani',
    title: 'El Guardián Illimani',
    subtitle: 'El coloso nevado de la ciudad maravilla',
    image: 'https://images.unsplash.com/photo-1621820091633-a84ac5a09156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbGxpbWFuaSUyMG1vdW50YWluJTIwbGElMjBwYXp8ZW58MXx8fHwxNzcyNjc4MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  }
];

export function Catalog() {
  return (
    <div className="flex-1 flex flex-col relative bg-stone-100 p-4 pb-20 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="text-amber-700" size={24} />
        <h1 className="text-2xl font-serif font-bold text-stone-800">Leyendas de La Paz</h1>
      </div>
      
      <p className="text-stone-600 mb-6 text-sm md:text-base">
        Descubre las historias milenarias, mitos y tradiciones que envuelven a la ciudad maravilla y sus alrededores.
      </p>

      <div className="flex flex-col gap-5 relative z-10">
        {LEGENDS.map((legend, index) => (
          <Link
            key={legend.id}
            to={`/legend/${legend.id}`}
            className="group relative h-56 w-full rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <div className="absolute inset-0">
              <img 
                src={legend.image} 
                alt={legend.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-300 mb-1 block">
                  {index === 0 ? 'Destacado' : 'Leyenda'}
                </span>
                <h2 className="text-2xl font-serif font-bold mb-1 leading-tight">{legend.title}</h2>
                <p className="text-sm text-stone-300 line-clamp-1">{legend.subtitle}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                <ChevronRight size={20} className="text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-stone-400 text-sm">Más sectores próximamente...</p>
      </div>
    </div>
  );
}
