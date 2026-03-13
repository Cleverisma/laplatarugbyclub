import { component$ } from '@builder.io/qwik';
import event1Img from '~/media/2.jpeg';
import event2Img from '~/media/3.jpeg';
import { Button } from '~/components/ui/button/button';

export interface EventCardProps {
  id: string;
  title: string;
  datetime: string;
  description: string;
  imageUrl?: string;
}

const MOCK_EVENTS: EventCardProps[] = [
  {
    id: '1',
    title: 'Sunset en LPRC',
    datetime: 'Sábado 14 de Marzo, 15:30 hs',
    description: 'Estimados socios y familias de LPRC,\n\nEste sábado, después del partido de la Primera División (15:30), los invitamos a quedarse en el club para disfrutar juntos de nuestro Sunset en LPRC.\n\nHabrá música, barra de tragos y un lindo espacio para encontrarnos, charlar y seguir viviendo el club entre amigos y en familia.\nLos esperamos para cerrar el día en el club.',
    imageUrl: event1Img
  },
  {
    id: '2',
    title: 'Juegos Recreativos Infantiles',
    datetime: 'Sábado post 3er tiempo',
    description: '🏉 Este sábado, después del tercer tiempo! \n\nAl finalizar el tercer tiempo de Infantiles y Preinfantiles, entrenadores y entrenadoras del club van a organizar juegos recreativos para los chicos.\n\nLa idea es compartir un rato más en el club, que los chicos sigan jugando y que las familias se queden a disfrutar la tarde.\n\nA las 15:30 comienza el partido de la Primera, ¡así que los invitamos a quedarse y alentar juntos!\n\nLos esperamos para seguir viviendo el club en familia. 💛',
    imageUrl: event2Img
  },
  {
    id: '3',
    title: 'Ingreso Sábados',
    datetime: 'Partidos Plantel Superior',
    description: 'ESTACIONAMIENTO:\nSocios: $7.000\nNo Socios: $15.000\n\nACCESO:\nNo Socios: $10.000',
    imageUrl: undefined
  }
];

export const EventCard = component$<EventCardProps>(({ title, datetime, description, imageUrl }) => {
  return (
    <article class="bg-black/60 border border-gray-800 backdrop-blur-md flex flex-col h-full group overflow-hidden relative transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold top accent */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500 z-10" />

      <div class="aspect-video relative overflow-hidden bg-gray-900">
        {imageUrl ? (
          <img src={imageUrl} alt={title} width="600" height="338" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out filter brightness-90 group-hover:brightness-100" />
        ) : (
          <div class="w-full h-full flex items-center justify-center">
            <span
              class="text-4xl font-black text-gray-700 tracking-widest"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              LPRC
            </span>
          </div>
        )}
        {/* Badge */}
        <div
          class="absolute top-4 left-0 bg-yellow-400 text-[#0a1128] text-xs font-black px-4 py-1.5 uppercase tracking-wider shadow-md"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Próximo
        </div>
      </div>

      <div class="p-6 flex flex-col flex-grow">
        <time
          class="text-yellow-400/80 text-xs mb-3 uppercase tracking-widest flex items-center gap-2 font-semibold"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {datetime}
        </time>

        <h3
          class="text-xl font-black text-white mb-4 leading-tight group-hover:text-yellow-400 transition-colors duration-200"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          {title}
        </h3>

        <div class="w-8 h-px bg-yellow-400/50 mb-4" />

        <p class="text-gray-400 flex-grow text-sm leading-relaxed whitespace-pre-line"
           style={{ fontFamily: "'Inter', sans-serif" }}>
          {description}
        </p>

        <div class="mt-6">
          <Button
            look="ghost"
            size="sm"
            class="rounded-none text-gray-400 border border-gray-700 hover:border-yellow-400 hover:text-yellow-400 uppercase tracking-widest text-xs transition-all duration-200 self-start px-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Ver Detalles →
          </Button>
        </div>
      </div>
    </article>
  );
});

export const LatestEvents = component$(() => {
  return (
    <section class="py-28 relative" style={{ background: 'linear-gradient(135deg, #0a1128 0%, #001f54 50%, #000000 100%)' }}>
      {/* Diagonal top edge */}
      <div
        class="absolute top-0 left-0 w-full overflow-hidden pointer-events-none"
        style={{ height: '80px', marginTop: '-79px' }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full" style={{ display: 'block' }}>
          <polygon points="0,100 100,0 100,100" fill="#0a1128" />
        </svg>
      </div>

      {/* Subtle grid texture */}
      <div
        class="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div class="container mx-auto px-4 max-w-6xl relative z-10">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="h-px w-12 bg-yellow-400" />
              <span
                class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Calendario
              </span>
            </div>
            <h2
              class="text-5xl md:text-6xl font-black text-white leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              PRÓXIMOS<br />
              <span class="text-yellow-400">EVENTOS</span>
            </h2>
          </div>
          <a
            href="/eventos"
            class="hidden md:flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors uppercase tracking-widest text-xs font-bold mt-6 md:mt-0 border-b border-transparent hover:border-yellow-400 pb-px"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Ver calendario completo <span>→</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-800">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        <div class="mt-10 text-center md:hidden">
          <Button
            look="outline"
            size="md"
            class="rounded-none border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#0a1128] uppercase tracking-widest font-black transition-all duration-200 px-10"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Ver calendario completo
          </Button>
        </div>
      </div>
    </section>
  );
});
