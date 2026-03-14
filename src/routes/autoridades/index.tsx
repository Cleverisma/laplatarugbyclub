import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { boardMembers } from '~/db/schema';
import { asc } from 'drizzle-orm';

export const useBoardMembersLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const result = await db
    .select()
    .from(boardMembers)
    .orderBy(asc(boardMembers.displayOrder));
  
  return result;
});

export default component$(() => {
  const boardMembersData = useBoardMembersLoader();

  const groupedMembers = boardMembersData.value.reduce((acc, member) => {
    let group = acc.find(g => g.role === member.role);
    if (!group) {
      group = { role: member.role, people: [] };
      acc.push(group);
    }
    group.people.push(member);
    return acc;
  }, [] as { role: string, people: typeof boardMembersData.value }[]);

  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 pt-24 md:pt-32 bg-[#0a1128]">
      {/* Hero Header */}
      <section 
        class="relative w-full bg-[#0a1128] py-16 md:py-24 px-4 flex flex-col items-center justify-center z-10"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw'
        }}
      >
        <span class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-4 block" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Dirigencia LPRC
        </span>
        <h1 
          class="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter text-center leading-none"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          AUTORIDADES
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>


      {/* Board Members Section (Dynamic) */}
      <section
        class="py-24 md:py-32 relative border-t border-gray-900"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a1128 100%)' }}
      >
        <div class="container mx-auto px-4 max-w-7xl">
          <div class="mb-32">
            <div class="text-center mb-20">
              <span
                class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Nuestro Equipo
              </span>
              <p
                class="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                El equipo de trabajo que lidera nuestro club con compromiso y dedicación, velando siempre por el crecimiento institucional y deportivo bajo los valores de LPRC.
              </p>
            </div>

            {groupedMembers.length > 0 ? (
              <div class="flex flex-col gap-16">
                {groupedMembers.map((group) => (
                  <div key={group.role} class="flex flex-col">
                    <h3 
                      class="text-2xl md:text-3xl text-[#FFD700] font-black uppercase tracking-widest border-b border-gray-800 pb-2 mb-6"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {group.role}
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {group.people.map((person) => (
                        <div 
                          key={person.id} 
                          class="bg-black/40 p-4 border-l-2 border-transparent hover:border-[#FFD700] transition-colors rounded-none flex items-center"
                        >
                          <span 
                            class="text-base font-semibold text-gray-200"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {person.fullName}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
               <p class="text-gray-400 text-center uppercase tracking-widest font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>Próximamente...</p>
            )}
          </div>

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
              href="/"
              class="inline-block text-gray-400 border-b border-gray-600 pb-1 font-bold text-sm hover:text-yellow-400 hover:border-yellow-400 transition-colors uppercase tracking-widest"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Volver a inicio →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
});

export const head: DocumentHead = {
  title: 'Autoridades | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conoce al equipo de trabajo y autoridades que lideran nuestro club con compromiso y dedicación bajo los valores de LPRC.',
    },
  ],
};
