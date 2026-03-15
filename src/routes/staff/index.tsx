import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';

export const useStaffLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const divisionsData = await db.query.divisions.findMany({
    with: {
      staffMembers: {
        orderBy: (staffMembers, { asc }) => [asc(staffMembers.displayOrder)],
      },
    },
    orderBy: (divisions, { asc }) => [asc(divisions.displayOrder)],
  });
  return divisionsData;
});

export const head: DocumentHead = {
  title: 'Staff Técnico & Directivo | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conocé a nuestro staff técnico y directivo.',
    },
  ],
};

export default component$(() => {
  const divisionsLoader = useStaffLoader();
  const categories = ['Plantel Superior', 'Juvenil', 'Infantil'];
  const activeCategory = useSignal(categories[0]);

  return (
    <div class="relative min-h-screen bg-[#0a1128] pt-48 md:pt-52 pb-24 overflow-hidden">
      {/* Background Overlay */}
      <div class="fixed inset-0 z-0">
        <div class="absolute inset-0 bg-black/60 z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 via-black/50 to-[#0a1128]/90 z-20"></div>
      </div>

      <div class="container mx-auto px-4 max-w-[95vw] lg:max-w-6xl relative z-30">
        <div class="text-center mb-12">
          <h1
            class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Staff Técnico & Directivo
          </h1>
          <div class="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </div>

        {/* Category Chips */}
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick$={() => (activeCategory.value = category)}
              class={`px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 border-2 ${activeCategory.value === category
                ? 'bg-yellow-400 text-[#0a1128] border-yellow-400'
                : 'bg-white/5 text-gray-300 border-gray-600 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {category}
            </button>
          ))}
        </div>

        <div class="space-y-12">
          {(() => {
            const categoryDivisions = divisionsLoader.value.filter((d) => d.groupType === activeCategory.value);

            if (categoryDivisions.length === 0) return (
              <div class="text-center text-gray-400 py-12">
                <p>No se encontraron divisiones para esta categoría.</p>
              </div>
            );

            return categoryDivisions.map((division) => (
              <div key={division.id} class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-10 animate-[fadeIn_0.5s_ease-out]">
                <h3
                  class="text-2xl md:text-3xl font-bold text-yellow-500 uppercase tracking-widest mb-8 border-b border-white/10 pb-4"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {division.name}
                </h3>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {division.staffMembers.map((member) => (
                    <div
                      key={member.id}
                      class={`p-4 rounded-lg flex flex-col justify-center border-l-4 ${member.displayOrder === 1
                        ? 'bg-white/10 border-yellow-400'
                        : 'bg-white/5 border-gray-600'
                        } transition-all duration-300 hover:bg-white/10`}
                    >
                      <h3 class="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {member.fullName}
                      </h3>
                      <p class="text-sm font-medium text-gray-400 uppercase tracking-wider">{member.role}</p>
                    </div>
                  ))}
                  {division.staffMembers.length === 0 && (
                    <p class="text-gray-400 italic">No hay staff registrado aún.</p>
                  )}
                </div>
              </div>
            ));
          })()}

          {divisionsLoader.value.length === 0 && (
            <div class="text-center text-gray-400 py-12">
              <p>No se encontraron divisiones ni miembros del staff.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
