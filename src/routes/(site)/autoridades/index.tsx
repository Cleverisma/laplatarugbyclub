import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { boardMembers } from '~/db/schema';
import { asc } from 'drizzle-orm';
import bgImage from '~/media/3.jpeg';

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
          Dirigencia LPRC
        </span>
        <h1 
          class="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter text-center leading-none"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          COMISIÓN DIRECTIVA 2026
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>


      {/* Board Members Section (Dynamic) */}
      <section
        class="py-24 md:py-32 relative border-t border-white/5"
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
              <div class="space-y-12">
                {groupedMembers.map((group) => (
                  <div key={group.role} class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-10 animate-[fadeIn_0.5s_ease-out]">
                    <h3 
                      class="text-2xl md:text-3xl font-bold text-yellow-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4"
                      style={{ fontFamily: "'Oswald', sans-serif" }}
                    >
                      {group.role}
                    </h3>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.people.map((person) => (
                        <div 
                          key={person.id} 
                          class={`p-4 rounded-lg flex flex-col justify-center border-l-4 ${person.displayOrder === 1
                            ? 'bg-white/10 border-yellow-400'
                            : 'bg-white/5 border-gray-600'
                          } transition-all duration-300 hover:bg-white/10`}
                        >
                          <h3 class="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                            {person.fullName}
                          </h3>
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
  title: 'Comisión Directiva 2026 | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conoce al equipo de trabajo y comisión directiva que lideran nuestro club con compromiso y dedicación bajo los valores de LPRC.',
    },
  ],
};
