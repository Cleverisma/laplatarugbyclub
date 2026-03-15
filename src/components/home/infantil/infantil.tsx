import { component$ } from '@builder.io/qwik';
import { infantilCategories, type InfantilCategory } from '~/data/infantil-info';

export const CategoryCard = component$<{ category: InfantilCategory }>(({ category }) => {
  return (
    <div class="bg-black/40 border border-gray-800 p-8 flex flex-col items-center text-center w-full h-full relative overflow-hidden group transition-all duration-300 hover:border-yellow-400/50">
      {/* Gold accent line */}
      <div class="absolute top-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-500" />

      <h3
        class="text-4xl md:text-5xl font-black text-yellow-500 mb-6 group-hover:text-yellow-400 transition-colors"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {category.name}
      </h3>

      <div class="w-full flex flex-col items-center space-y-6">
        <div class="w-full pt-4 border-t border-yellow-500/80">
          <span
            class="block text-sm font-bold text-yellow-500 uppercase italic tracking-widest mb-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ENTRENADORES
          </span>
          <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-left px-2">
            {category.entrenadores.map((name) => (
              <span
                key={name}
                class="text-gray-300 text-sm font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <div class="w-full flex justify-between pt-4 border-t border-yellow-500/80">
          <div class="flex flex-col items-start w-1/2">
            <span
              class="block text-sm font-bold text-yellow-500 uppercase italic tracking-widest mb-1.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              MANAGER
            </span>
            <span
              class="text-gray-400 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category.manager}
            </span>
          </div>

          <div class="flex flex-col items-end w-1/2 text-right">
            <span
              class="block text-sm font-bold text-yellow-500 uppercase italic tracking-widest mb-1.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              RESPONSABLE
            </span>
            <span
              class="text-gray-400 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {category.responsable}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export const Infantil = component$(() => {
  return (
    <section
      id="infantil"
      class="py-24 md:py-32 relative border-t border-gray-900"
      style={{ background: 'linear-gradient(180deg, #0a1128 0%, #000000 100%)' }}
    >
      <div class="container mx-auto px-4 max-w-7xl">
        {/* Categories Section */}
        <div class="mb-32">
          <div class="text-center mb-20">
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              El Futuro del Club
            </span>
            <h2
              class="text-5xl md:text-7xl font-black text-white mb-4 leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              INFANTIL
            </h2>
            <div class="h-px w-20 bg-yellow-400 mx-auto mb-8" />
            <p
              class="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Acompañando a los más chicos en sus primeros pasos, formando valores, amistades y pasión por el rugby.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 bg-transparent">
            {infantilCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>



      </div>
    </section>
  );
});
