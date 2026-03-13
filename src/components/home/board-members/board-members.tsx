import { component$ } from '@builder.io/qwik';
import { boardMembers, coachesStaff, type BoardMember, type Coach } from '~/data/club-info';

export const BoardMemberCard = component$<{ boardMember: BoardMember }>(({ boardMember }) => {
  return (
    <div class="bg-black/40 border border-gray-800 p-6 flex flex-col items-start w-full relative overflow-hidden group transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold accent line */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500" />

      <h3
        class="text-xs font-black text-yellow-400/70 uppercase tracking-widest mb-4 group-hover:text-yellow-400 transition-colors"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {boardMember.role}
      </h3>

      <div class="flex flex-col space-y-2 w-full">
        {boardMember.names.map((name) => (
          <span
            key={name}
            class="text-base font-semibold text-gray-300 border-l-2 border-transparent group-hover:border-yellow-400 pl-0 group-hover:pl-3 transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
});


export const CoachCard = component$<{ coach: Coach }>(({ coach }) => {
  return (
    <div class="bg-black/50 border border-gray-800 p-8 flex flex-col items-center text-center group w-full h-full relative overflow-hidden transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold top line */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500" />

      {/* Avatar — profile photos keep rounded-full */}
      <div class="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-md border-2 border-gray-700 group-hover:border-yellow-400 transition-colors duration-500">
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

export const BoardMembers = component$(() => {
  return (
    <section
      id="autoridades"
      class="py-24 md:py-32 relative border-t border-gray-900"
      style={{ background: 'linear-gradient(180deg, #000000 0%, #0a1128 100%)' }}
    >
      <div class="container mx-auto px-4 max-w-7xl">
        {/* Board Members Section */}
        <div class="mb-32">
          <div class="text-center mb-20">
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nuestro Equipo
            </span>
            <h2
              class="text-5xl md:text-7xl font-black text-white mb-4 leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              AUTORIDADES
            </h2>
            <div class="h-px w-20 bg-yellow-400 mx-auto mb-8" />
            <p
              class="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              El equipo de trabajo que lidera nuestro club con compromiso y dedicación, velando siempre por el crecimiento institucional y deportivo bajo los valores de LPRC.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-900">
            {boardMembers.map((member) => (
              <BoardMemberCard key={member.id} boardMember={member} />
            ))}
          </div>
        </div>

        {/* Coaches Staff Section */}
        <div>
          <div class="text-center mb-20">
            <h2
              class="text-5xl md:text-6xl font-black text-white mb-4 leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              STAFF DE<br />
              <span class="text-yellow-400">ENTRENADORES</span>
            </h2>
            <div class="h-px w-20 bg-yellow-400 mx-auto mb-8" />
            <p
              class="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Quienes día a día forman a las nuevas generaciones de jugadores con compromiso, valores y pasión por el rugby.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-900 max-w-5xl mx-auto">
            {coachesStaff.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>

        <div class="mt-20 text-center">
          <a
            href="/#institucional"
            class="inline-block text-gray-400 border-b border-gray-600 pb-1 font-bold text-sm hover:text-yellow-400 hover:border-yellow-400 transition-colors uppercase tracking-widest"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Ver todo el equipo →
          </a>
        </div>
      </div>
    </section>
  );
});
