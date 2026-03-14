import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { coachesStaff, type Coach } from '~/data/club-info';

export const CoachCard = component$<{ coach: Coach }>(({ coach }) => {
  return (
    <div class="bg-black/50 border border-gray-800 p-8 flex flex-col items-center text-center group w-full h-full relative overflow-hidden transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold top line */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500" />

      {/* Avatar — profile photos changed to rounded-none */}
      <div class="w-24 h-24 rounded-none overflow-hidden mb-6 shadow-md border-2 border-gray-700 group-hover:border-yellow-400 transition-colors duration-500 aspect-square">
        {coach.imageUrl ? (
          <img
            src={coach.imageUrl}
            alt={coach.category}
            width="96"
            height="96"
            class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        ) : (
          <div class="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
        )}
      </div>

      <h3
        class="text-2xl font-black text-white mb-1 group-hover:text-yellow-400 transition-colors"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {coach.category}
      </h3>

      <div class="w-8 h-px bg-yellow-400/40 my-4" />

      <div class="w-full flex flex-col items-center space-y-4">
        <div class="w-full">
          <span
            class="block text-xs text-yellow-400/60 uppercase tracking-widest mb-1.5"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Head Coach
          </span>
          <span
            class="text-base font-semibold text-gray-200"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {coach.headCoach}
          </span>
        </div>

        {coach.assistants.length > 0 && (
          <div class="w-full pt-4 border-t border-gray-800">
            <span
              class="block text-xs text-yellow-400/60 uppercase tracking-widest mb-1.5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Entrenadores
            </span>
            <span
              class="text-gray-400 text-sm leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {coach.assistants.join(' · ')}
            </span>
          </div>
        )}

        {coach.manager && (
          <div class="w-full pt-4 border-t border-gray-800">
            <span
              class="block text-xs text-yellow-400/60 uppercase tracking-widest mb-1.5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Manager
            </span>
            <span
              class="text-gray-400 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {coach.manager}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default component$(() => {
  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 bg-blue-950 pt-24">
      {/* Decorative background element */}
      <div class="fixed top-0 right-0 w-[800px] h-[800px] bg-blue-900 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <section class="py-16 relative z-10">
        <div class="container mx-auto px-4 max-w-7xl">
          <div class="text-center mb-20">
            <div class="inline-flex items-center gap-3 px-5 py-2 bg-white/10 text-yellow-400 font-bold text-sm uppercase tracking-widest rounded-full mb-8 border border-white/10 backdrop-blur-sm">
              <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              La Plata Rugby Club
            </div>
            <h1
              class="text-6xl md:text-8xl font-black text-white mb-4 leading-none tracking-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              STAFF DE<br />
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">ENTRENADORES</span>
            </h1>
            <p
              class="text-blue-200 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mt-6"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quienes día a día forman a las nuevas generaciones de jugadores con compromiso, valores y pasión por el rugby.
            </p>
          </div>

          <div class="mb-24">
            <div class="flex items-center gap-4 mb-10">
              <h2 class="text-3xl md:text-4xl font-black text-white tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Plantel Superior</h2>
              <div class="h-px bg-white/20 flex-grow" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-900 border border-gray-800">
              {coachesStaff.map((coach) => (
                <CoachCard key={`ps-${coach.id}`} coach={coach} />
              ))}
            </div>
          </div>

          <div class="mb-24">
            <div class="flex items-center gap-4 mb-10">
              <h2 class="text-3xl md:text-4xl font-black text-white tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Juveniles</h2>
              <div class="h-px bg-white/20 flex-grow" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-900 border border-gray-800">
              {coachesStaff.map((coach) => (
                <CoachCard key={`juv-${coach.id}`} coach={coach} />
              ))}
            </div>
          </div>

          <div class="mb-24">
            <div class="flex items-center gap-4 mb-10">
              <h2 class="text-3xl md:text-4xl font-black text-white tracking-widest uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>Infantiles</h2>
              <div class="h-px bg-white/20 flex-grow" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-900 border border-gray-800">
              {coachesStaff.map((coach) => (
                <CoachCard key={`inf-${coach.id}`} coach={coach} />
              ))}
            </div>
          </div>
          
          <div class="mt-20 text-center pb-20">
             <a href="/" class="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-transparent hover:border-white pb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                ← Volver al inicio
             </a>
          </div>

        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Staff de Entrenadores | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conocé al staff de entrenadores de La Plata Rugby Club. Plantel Superior, Juveniles e Infantiles.',
    },
  ],
};
