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

  const categories = ['Plantel Superior', 'Juvenil', 'Infantil'] as const;
  
  const groupedData = categories.reduce((acc, cat) => {
    acc[cat] = {
      subcomision: [],
      coaching: [],
      equipos: []
    };
    return acc;
  }, {} as Record<string, { subcomision: typeof divisionsData, coaching: typeof divisionsData, equipos: typeof divisionsData }>);

  const allCoachingDivisions: typeof divisionsData = [];

  divisionsData.forEach(division => {
    let group = division.groupType as string;
    if (group === 'Escuelita') {
      group = 'Infantil'; // Mapear Escuelita como un equipo dentro de Infantil
    }
    
    const type = (division as any).sectionType || 'equipo';
    
    if (type === 'coaching') {
      allCoachingDivisions.push(division);
    }
    
    if (groupedData[group]) {
      if (type === 'subcomision') groupedData[group].subcomision.push(division);
      else if (type === 'coaching') groupedData[group].coaching.push(division);
      else groupedData[group].equipos.push(division);
    }
  });

  return { groupedData, allCoaching: allCoachingDivisions };
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
  const dataLoader = useStaffLoader();
  const { groupedData, allCoaching } = dataLoader.value;

  const categories = ['Plantel Superior', 'Juvenil', 'Infantil', 'Departamento de Coaching'];
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

      {/* 
        ADMIN / MIGRATION HINT (Para el desarrollador / cliente):
        Se ha añadido una nueva columna a la tabla divisions en Drizzle: sectionType.
        Para empujar este cambio a la base de datos de Turso, ejecuta en tu terminal:
        pnpm exec drizzle-kit push
        (o pnpm db:push si tienes ese script configurado en package.json).
        
        Además, en el panel Admin de creación/edición de divisiones, asegúrate de:
        1. Mantener "Plantel Superior", "Juvenil", "Infantil", "Escuelita" en el select de `groupType`.
        2. Añadir un nuevo select/radio para `sectionType` con los valores: 'subcomision', 'coaching', 'equipo'.
      */}

      <section class="pb-24 pt-24 md:pt-32 relative border-t border-white/5 flex-1 space-y-16">
        <div class="container mx-auto px-4 max-w-[95vw] lg:max-w-6xl relative z-30">
          
          {/* Category Tabs */}
          <div class="flex flex-wrap justify-center gap-4 mb-20">
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

          <div class="animate-[fadeIn_0.5s_ease-out]">
            {(() => {
              if (activeCategory.value === 'Departamento de Coaching') {
                if (allCoaching.length === 0) {
                  return (
                    <div class="text-center text-gray-400 py-12 italic">
                      <p>No se encontraron entrenadores registrados en el Departamento de Coaching.</p>
                    </div>
                  );
                }
                
                return (
                  <div>
                    <div class="flex items-center justify-center mb-10">
                      <div class="hidden sm:block h-px w-12 bg-white/20"></div>
                      <h2 class="text-2xl md:text-3xl font-black text-gray-200 text-center mx-6 uppercase tracking-wider" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        DEPARTAMENTO DE <span class="text-yellow-400">COACHING</span>
                      </h2>
                      <div class="hidden sm:block h-px w-12 bg-white/20"></div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                       {allCoaching.map(division => (
                          division.staffMembers.map(member => (
                            <div key={member.id} class="bg-white/5 border border-white/10 p-5 rounded-lg text-center hover:bg-white/10 transition-colors shadow-lg">
                               <h3 class="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>{member.fullName}</h3>
                               <p class="text-gray-400 uppercase tracking-wider text-xs font-semibold">{member.role}</p>
                            </div>
                          ))
                       ))}
                    </div>
                  </div>
                );
              }

              const plantData = groupedData[activeCategory.value as keyof typeof groupedData];
              if (!plantData) return null;

              const { subcomision, equipos } = plantData;

              const totalDivisionsCount = subcomision.length + equipos.length;
              if (totalDivisionsCount === 0) {
                return (
                  <div class="text-center text-gray-400 py-12 italic">
                    <p>No se encontraron divisiones registradas para {activeCategory.value}.</p>
                  </div>
                );
              }

              return (
                <div class="space-y-24">
                  {/* 1. SUBCOMISIÓN DE RUGBY (Nested) */}
                  {subcomision.length > 0 && (
                    <div>
                      <h2 class="text-3xl md:text-4xl font-black text-white text-center mb-10 uppercase tracking-tighter" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        SUBCOMISIÓN DE <span class="text-yellow-400">RUGBY</span>
                      </h2>
                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                         {subcomision.map(division => (
                            division.staffMembers.map(member => (
                              <div key={member.id} class="bg-gradient-to-br from-white/10 to-transparent border border-white/20 p-6 rounded-xl text-center shadow-lg backdrop-blur-md transition-transform hover:-translate-y-1">
                                 <h3 class="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>{member.fullName}</h3>
                                 <p class="text-yellow-400 uppercase tracking-widest text-xs font-bold">{member.role}</p>
                              </div>
                            ))
                         ))}
                      </div>
                    </div>
                  )}

                  {/* 3. EQUIPOS / DIVISIONES REGULARES */}
                  {equipos.length > 0 && (() => {
                    const subcategories = ['Todas', ...equipos.map((d) => d.name)];
                    const displayedDivisions = activeSubcategory.value === 'Todas' 
                      ? equipos 
                      : equipos.filter((d) => d.name === activeSubcategory.value);

                    return (
                      <div>
                        {/* Nested Subcategory Chips */}
                        {subcategories.length > 2 && (
                          <div class="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-2">
                            {subcategories.map((sub) => (
                              <button
                                key={`sub-${sub}`}
                                onClick$={() => (activeSubcategory.value = sub)}
                                class={`px-4 py-1.5 rounded-full font-bold tracking-wide text-xs transition-colors duration-200 border whitespace-nowrap flex-shrink-0 ${
                                  activeSubcategory.value === sub
                                    ? 'bg-yellow-400 text-[#0a1128] border-yellow-400'
                                    : 'bg-white/5 text-gray-400 border-gray-700 hover:bg-white/10 hover:text-gray-200 hover:border-gray-500'
                                }`}
                                style={{ fontFamily: "'Inter', sans-serif" }}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}

                        <div class="space-y-10">
                          {displayedDivisions.map((division) => (
                            <div key={division.id} class="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8 animate-[fadeIn_0.5s_ease-out]">
                              {activeSubcategory.value === 'Todas' && (
                                <h3
                                  class="text-xl md:text-2xl font-bold text-yellow-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-3"
                                  style={{ fontFamily: "'Oswald', sans-serif" }}
                                >
                                  {division.name}
                                </h3>
                              )}

                              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {division.staffMembers.map((member) => (
                                  <div
                                    key={member.id}
                                    class={`p-4 rounded-lg flex flex-col justify-center border-l-4 ${member.displayOrder === 1
                                      ? 'bg-white/10 border-yellow-400'
                                      : 'bg-white/5 border-gray-600'
                                      } transition-colors duration-300 hover:bg-white/10`}
                                  >
                                    <h3 class="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                                      {member.fullName}
                                    </h3>
                                    <p class="text-xs font-medium text-gray-400 uppercase tracking-wider">{member.role}</p>
                                  </div>
                                ))}
                                {division.staffMembers.length === 0 && (
                                  <p class="text-gray-400 italic text-sm">No hay staff asignado a este equipo.</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                </div>
              );
            })()}
          </div>
        </div>
      </section>
    </main>
  );
});
