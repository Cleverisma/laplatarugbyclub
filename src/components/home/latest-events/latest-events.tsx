import { component$ } from '@builder.io/qwik';
import event1Img from '~/media/2.jpeg';
import event2Img from '~/media/3.jpeg';

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
    datetime: 'Sábado 15:30 hs',
    description: 'Post partido Primera. Música, barra de tragos, amigos y familia.',
    imageUrl: event1Img
  },
  {
    id: '2',
    title: 'Juegos Recreativos Infantiles',
    datetime: 'Sábado post 3er tiempo',
    description: 'Organizado por el staff de entrenadores para compartir la tarde.',
    imageUrl: event2Img
  }
];

export const EventCard = component$<EventCardProps>(({ title, datetime, description, imageUrl }) => {
  return (
    <article class="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 group overflow-hidden">
      <div class="aspect-video bg-blue-50 relative overflow-hidden">
        {imageUrl ? (
            <img src={imageUrl} alt={title} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" />
        ) : (
            <div class="w-full h-full bg-blue-900/5 flex items-center justify-center text-blue-900/30 font-bold uppercase tracking-widest">
                LPRC
            </div>
        )}
        <div class="absolute top-4 right-4 bg-yellow-400 text-blue-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Próximo
        </div>
      </div>
      <div class="p-8 flex flex-col flex-grow">
        <time class="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wide flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {datetime}
        </time>
        <h3 class="text-2xl font-black text-blue-950 mb-4 leading-tight group-hover:text-blue-700 transition-colors">{title}</h3>
        <p class="text-gray-600 flex-grow text-base leading-relaxed">{description}</p>
        <button class="mt-8 text-blue-800 font-bold hover:text-yellow-500 transition-colors flex items-center gap-2 self-start uppercase tracking-wide text-sm">
            Ver Detalles 
            <span class="transform group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </article>
  );
});

export const LatestEvents = component$(() => {
  return (
    <section class="py-24 bg-gray-50 relative">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
                <div class="flex items-center gap-4 mb-4">
                    <div class="h-2 w-12 bg-yellow-400 rounded-full"></div>
                    <span class="text-blue-600 font-bold uppercase tracking-widest text-sm">Calendario</span>
                </div>
                <h2 class="text-4xl md:text-5xl font-black text-blue-950 tracking-tight">Próximos Eventos</h2>
            </div>
            <a href="/eventos" class="hidden md:flex items-center gap-2 text-blue-800 font-bold hover:text-blue-600 transition-colors">
                Ver calendario completo <span>&rarr;</span>
            </a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>
        
        <div class="mt-12 text-center md:hidden">
             <a href="/eventos" class="inline-block border-2 border-blue-900 text-blue-900 font-bold py-4 px-10 rounded-full hover:bg-blue-900 hover:text-white transition-colors">
                Ver calendario completo
            </a>
        </div>
      </div>
    </section>
  );
});
