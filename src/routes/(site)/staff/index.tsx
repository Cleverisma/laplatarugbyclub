import { component$, useSignal } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import bgImage from '~/media/3.jpeg';

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
  title: 'Staff de entrenadores | La Plata Rugby Club',
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
  const activeSubcategory = useSignal('Todas');

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
        <h1 
          class="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter text-center leading-none"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          STAFF DE ENTRENADORES
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>

      <section
        class="pb-24 pt-24 md:pt-32 relative border-t border-gray-900 flex-1"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a1128 100%)' }}
      >
        <div class="container mx-auto px-4 max-w-[95vw] lg:max-w-6xl relative z-30">
          {/* Category Chips */}
          <div class="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick$={() => {
                activeCategory.value = category;
                activeSubcategory.value = 'Todas';
              }}
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
            const subcategories = ['Todas', ...categoryDivisions.map((d) => d.name)];

            if (categoryDivisions.length === 0) return (
              <div class="text-center text-gray-400 py-12">
                <p>No se encontraron divisiones para esta categoría.</p>
              </div>
            );

            const displayedDivisions = activeSubcategory.value === 'Todas' 
              ? categoryDivisions 
              : categoryDivisions.filter((d) => d.name === activeSubcategory.value);

            return (
              <div class="animate-[fadeIn_0.5s_ease-out]">
                {/* Nested Subcategory Chips */}
                {subcategories.length > 2 && (
                  <div class="flex flex-wrap justify-center gap-2 mb-12">
                    {subcategories.map((sub) => (
                      <button
                        key={`sub-${sub}`}
                        onClick$={() => (activeSubcategory.value = sub)}
                        class={`px-4 py-1.5 rounded-full font-medium tracking-wide text-xs transition-colors duration-200 border ${
                          activeSubcategory.value === sub
                            ? 'bg-white/20 text-white border-white/50'
                            : 'bg-white/5 text-gray-400 border-gray-700 hover:bg-white/10 hover:text-gray-200 hover:border-gray-500'
                        }`}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Filtered Display */}
                <div class="space-y-12">
                  {displayedDivisions.map((division) => (
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
                  ))}
                </div>
              </div>
            );
          })()}

          {divisionsLoader.value.length === 0 && (
            <div class="text-center text-gray-400 py-12">
              <p>No se encontraron divisiones ni miembros del staff.</p>
            </div>
          )}
        </div>
        </div>
      </section>
    </main>
  );
});
