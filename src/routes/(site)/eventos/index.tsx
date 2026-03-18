import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { EventCard } from '~/components/home/latest-events/latest-events';
import { EVENTS } from '~/data/events-data';

export const head: DocumentHead = {
  title: 'Calendario de Eventos | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Próximos eventos, actividades y encuentros en La Plata Rugby Club. Enterate de todo lo que pasa en el club.',
    },
  ],
};

export default component$(() => {
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

      <div class="container mx-auto px-4 max-w-6xl relative z-10 pt-32 pb-20">
        {/* Header */}
        <div class="mb-16">
          <div class="flex items-center gap-4 mb-4">
            <div class="h-px w-12 bg-yellow-400" />
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Actividades
            </span>
          </div>
          <h1
            class="text-5xl md:text-7xl font-black text-white leading-none mb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            CALENDARIO DE<br />
            <span class="text-yellow-400">EVENTOS</span>
          </h1>
          <p class="text-gray-400 text-lg max-w-xl" style={{ fontFamily: "'Inter', sans-serif" }}>
            Todas las actividades, encuentros y eventos que se vienen en La Plata Rugby Club.
          </p>
        </div>

        {/* Events Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Empty state (for when there are no events) */}
        {EVENTS.length === 0 && (
          <div class="text-center py-20">
            <p class="text-gray-500 text-lg">No hay eventos programados por el momento.</p>
          </div>
        )}
      </div>
    </main>
  );
});
