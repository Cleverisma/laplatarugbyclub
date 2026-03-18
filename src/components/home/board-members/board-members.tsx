import { component$ } from '@builder.io/qwik';
import { boardMembers, type BoardMember } from '~/data/club-info';

export const BoardMemberCard = component$<{ boardMember: BoardMember }>(({ boardMember }) => {
  return (
    <div class="bg-black/40 border border-gray-800 p-6 flex flex-col items-start w-full relative overflow-hidden group transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold accent line */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500" />

      <p
        class="text-sm text-gray-500 uppercase tracking-wider mb-4 group-hover:text-yellow-400 transition-colors"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {boardMember.role}
      </p>

      <div class="flex flex-col space-y-2 w-full">
        {boardMember.names.map((name) => (
          <span
            key={name}
            class="text-xl md:text-2xl font-bold text-white border-l-2 border-transparent group-hover:border-yellow-400 pl-0 group-hover:pl-3 transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {name}
          </span>
        ))}
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

        {/* Coaches Staff Section - Replaced with Button */}
        <div class="text-center py-10">
          <a href="/staff" class="inline-block">
            <button
              class="bg-yellow-400 text-[#0a1128] border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-400 font-black uppercase tracking-widest text-lg transition-all duration-300 px-12 py-5"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              STAFF 2026
            </button>
          </a>
        </div>

        <div class="mt-20 text-center">
          <a
            href="/#institucional"
            class="inline-block text-gray-400 border-b border-gray-600 pb-1 font-bold text-sm hover:text-yellow-400 hover:border-yellow-400 transition-colors uppercase tracking-widest"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Volver a inicio →
          </a>
        </div>
      </div>
    </section>
  );
});
