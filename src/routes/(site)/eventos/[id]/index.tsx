import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getEventById } from '~/data/events-data';

export const useEventLoader = routeLoader$((requestEvent) => {
  const id = requestEvent.params.id;
  const event = getEventById(id);

  if (!event) {
    throw requestEvent.redirect(302, '/eventos');
  }

  return event;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const event = resolveValue(useEventLoader);
  return {
    title: `${event.title} | Eventos — La Plata Rugby Club`,
    meta: [
      {
        name: 'description',
        content: event.description.split('\n')[0],
      },
    ],
  };
};

export default component$(() => {
  const event = useEventLoader();
  const { title, datetime, description, imageUrl } = event.value;

  return (
    <main class="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #0a1128 0%, #001f54 50%, #000000 100%)' }}>
      {/* Subtle grid texture */}
      <div
        class="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div class="container mx-auto px-4 max-w-4xl relative z-10 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/eventos"
          class="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors uppercase tracking-widest text-xs font-bold mb-10 border-b border-transparent hover:border-yellow-400 pb-px"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al calendario
        </Link>

        {/* Hero image */}
        {imageUrl && (
          <div class="w-full aspect-video rounded-sm overflow-hidden mb-10 border border-white/10 shadow-2xl">
            <img
              src={imageUrl}
              alt={title}
              width="900"
              height="506"
              class="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div>
          {/* Badge */}
          <div
            class="inline-block bg-yellow-400 text-[#0a1128] text-xs font-black px-4 py-1.5 uppercase tracking-wider shadow-md mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Próximo Evento
          </div>

          <time
            class="text-yellow-400/80 text-sm mb-4 uppercase tracking-widest flex items-center gap-2.5 font-semibold"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {datetime}
          </time>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none mb-8"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            {title}
          </h1>

          <div class="w-16 h-0.5 bg-yellow-400 mb-8" />

          <div
            class="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line max-w-2xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {description}
          </div>
        </div>

        {/* Bottom navigation */}
        <div class="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/eventos"
            class="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors uppercase tracking-widest text-sm font-bold"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Ver todos los eventos
          </Link>
        </div>
      </div>
    </main>
  );
});
