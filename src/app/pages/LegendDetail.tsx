import React, { useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { MessageCircle, Gamepad2, ArrowLeft, Download, CreditCard, ExternalLink } from 'lucide-react';

export function LegendDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [id]);

  // For this prototype, we just focus on Lago Titicaca content
  const content = {
    title: "La leyenda inca del Lago Titicaca",
    image: "https://images.unsplash.com/photo-1597681017981-c4654947c061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwdGl0aWNhY2ElMjBib2xpdmlhfGVufDF8fHx8MTc3MjY3ODE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    paragraphs: [
      "Cuenta la leyenda que el dios Inti (el Sol) compadeció a los hombres que vivían como animales salvajes en la tierra, sin conocer la agricultura ni el tejido. Para civilizarlos, envió a sus dos hijos: Manco Cápac y Mama Ocllo.",
      "Ambos emergieron de las espumosas aguas del Lago Titicaca, el lago sagrado. Inti les entregó una vara de oro y les ordenó que caminaran hacia el norte, hundiendo la vara en la tierra cada vez que se detuvieran a descansar.",
      "El dios Sol les indicó que el lugar donde la vara se hundiera fácilmente sería la tierra prometida, donde deberían fundar la capital de su futuro imperio y enseñar a los hombres a vivir en sociedad.",
      "Tras mucho caminar, Manco Cápac y Mama Ocllo llegaron a un valle fértil al pie del cerro Huanacauri. Allí, la vara de oro se hundió en la tierra de un solo golpe, desapareciendo por completo. ¡Ese era el lugar elegido!",
      "Manco Cápac se encargó de enseñar a los hombres a cultivar la tierra, construir canales de riego y erigir viviendas. Mama Ocllo, por su parte, enseñó a las mujeres a tejer, coser y cocinar.",
      "Así nació la majestuosa ciudad del Cusco, el 'Ombligo del Mundo', capital del poderoso Imperio Incaico, una civilización que floreció bajo la guía de los hijos del Sol."
    ]
  };

  const handleFullClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para comprar el juego.");
      navigate('/login');
    } else {
      navigate('/payment');
    }
  };

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
            src={content.image} 
            alt={content.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
          <h1 className="absolute bottom-6 left-6 right-6 text-3xl md:text-4xl font-serif font-bold text-white leading-tight drop-shadow-md">
            {content.title}
          </h1>
        </div>

        <div className="px-6 py-8">
          <div className="prose prose-stone max-w-none space-y-4">
            {content.paragraphs.map((p, i) => (
              <p key={i} className="text-stone-700 text-lg leading-relaxed font-sans first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-amber-700 first-line:tracking-widest first-line:uppercase">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto bg-stone-50 border-t border-stone-200 p-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm active:scale-95 bg-amber-100 text-amber-900 hover:bg-amber-200"
              onClick={() => alert("Descargando demo (Mock)...")}
            >
              <Gamepad2 size={20} />
              <span>Jugar Demo</span>
            </button>
            <button 
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm active:scale-95 bg-amber-700 text-white hover:bg-amber-800 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              onClick={handleFullClick}
            >
              <CreditCard size={20} />
              <span>Completo ($2)</span>
            </button>
          </div>
          <Link 
            to={`/legend/${id}/comments`}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all active:scale-95 bg-stone-200 text-stone-800 hover:bg-stone-300"
          >
            <MessageCircle size={20} />
            <span>Ver Comentarios</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
