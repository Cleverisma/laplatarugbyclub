import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { EventCard } from '~/components/home/latest-events/latest-events';
import { getEvents } from '~/data/events-data';
import bgImage from '~/media/3.jpeg';

export const useEventsLoader = routeLoader$(async (requestEvent) => {
  return getEvents(requestEvent.env);
});

export const head: DocumentHead = {
  title: 'Agenda | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Próximos eventos, actividades y encuentros en La Plata Rugby Club. Enterate de todo lo que pasa en el club.',
    },
  ],
};

export default component$(() => {
  const eventsData = useEventsLoader();

  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 bg-[#0a1128]">
      {/* Hero Header */}
      <section 
        class="relative w-full py-32 md:py-48 px-4 flex flex-col items-center justify-center z-10 bg-cover bg-center"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw',
          backgroundImage: `linear-gradient(rgba(10, 17, 40, 0.85), rgba(10, 17, 40, 0.95)), url(${bgImage})`
        }}
      >
        <span class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-4 block" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Actividades
        </span>
        <h1 
          class="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter text-center leading-none"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          AGENDA
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>

      <section
        class="pb-24 pt-24 md:pt-32 relative border-t border-white/5 flex-1"
      >
        <div class="container mx-auto px-4 max-w-6xl relative z-30">
          <p class="text-gray-400 text-lg max-w-xl mx-auto text-center mb-16" style={{ fontFamily: "'Inter', sans-serif" }}>
            Todas las actividades, encuentros y eventos que se vienen en La Plata Rugby Club.
          </p>

          {/* Events Grid */}
        {eventsData.value.length > 0 ? (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsData.value.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div class="text-center py-20">
            <p class="text-gray-500 text-lg">No hay eventos programados por el momento.</p>
          </div>
        )}
        </div>
      </section>
    </main>
  );
});
