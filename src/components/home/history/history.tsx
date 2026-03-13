import { component$ } from '@builder.io/qwik';

export const History = component$(() => {
  return (
    <section class="py-24 bg-blue-950 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900 rounded-full blur-3xl opacity-30 -mr-64 -mt-64 pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[120px] opacity-10 -ml-40 -mb-40 pointer-events-none" />

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div class="space-y-10">
            <div>
              <div class="inline-flex items-center gap-3 px-5 py-2 bg-white/10 text-yellow-400 font-bold text-sm uppercase tracking-widest rounded-full mb-8 border border-white/10 backdrop-blur-sm">
                <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                Nuestra Historia
              </div>
              <h2
                class="text-5xl md:text-7xl font-black mb-8 leading-[1.1]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Fundado <br />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
                  en 1934
                </span>
              </h2>

              <div class="space-y-5 text-blue-100 text-lg font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p>
                  La Plata Rugby Club nació en 1934 con el sueño de un grupo de jugadores platenses que querían
                  crear un espacio para disfrutar del rugby y promover este deporte en la ciudad de La Plata.
                </p>
                <p>
                  Desde sus comienzos, el club se construyó sobre una base clara de valores: el respeto, el
                  compañerismo, la solidaridad y el compromiso con la formación de personas a través del deporte.
                </p>
                <p>
                  Con el paso de los años, generaciones de jugadores, entrenadores, dirigentes y familias fueron
                  dejando su huella y aportando su esfuerzo para que el club siga creciendo.
                </p>
                <p>
                  Hoy, después de casi un siglo de historia, seguimos manteniendo el mismo espíritu que inspiró
                  a nuestros fundadores.{' '}
                  <strong class="font-semibold text-white">
                    Más que un club, somos una familia.
                  </strong>
                </p>
              </div>
            </div>

            {/* Lema blockquote */}
            <div>
              <p
                class="text-xs text-yellow-400/70 uppercase tracking-widest mb-4 font-semibold"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Nuestro Lema
              </p>
              <figure class="relative pl-8 py-4 before:absolute before:inset-y-0 before:left-0 before:w-2 before:bg-yellow-400 before:rounded-r-full">
                <blockquote
                  class="text-2xl md:text-3xl font-bold italic text-white leading-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  "Formar buenas personas que disfruten del rugby."
                </blockquote>
                <figcaption class="mt-4 text-sm text-blue-300 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Este principio inspira nuestro trabajo con las divisiones infantiles, juveniles y plantel superior,
                  promoviendo el deporte como una herramienta de aprendizaje y crecimiento personal.
                </figcaption>
              </figure>
            </div>

            {/* Closing paragraph */}
            <p class="text-blue-200 text-base leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              La historia del club no es solo su pasado, sino también su presente y su futuro. Cada entrenamiento,
              cada partido y cada encuentro en el club continúa escribiendo nuevas páginas de esta historia.
            </p>
          </div>

          {/* Championships card */}
          <div class="bg-gradient-to-br from-blue-900/80 to-blue-950/80 p-10 md:p-14 rounded-[3rem] border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none" />

            <h3
              class="text-3xl md:text-4xl font-black mb-4 text-center text-white tracking-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nuestros logros <span class="text-yellow-400">deportivos</span>
            </h3>
            <p class="text-center text-blue-200 text-sm mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
              Tres títulos nacionales con nuestra Primera División
            </p>

            <div class="grid grid-cols-3 gap-6 text-center">
              <div class="flex flex-col items-center">
                <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-800 border-2 border-white/20 text-yellow-400 flex items-center justify-center mb-4 shadow-xl group-hover:bg-yellow-400 group-hover:text-blue-950 group-hover:border-yellow-400 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span class="text-3xl font-black font-mono tracking-tight">1995</span>
                <span class="text-xs text-blue-300 mt-1 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>Campeón<br/>de la UAR</span>
              </div>

              <div class="flex flex-col items-center transform -translate-y-4">
                <div class="w-24 h-24 md:w-28 md:h-28 rounded-full bg-yellow-400 text-blue-950 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(250,204,21,0.3)] border-4 border-blue-950 relative z-10 transition-transform duration-300 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 md:h-14 md:w-14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
                  </svg>
                </div>
                <span class="text-4xl font-black font-mono tracking-tight text-yellow-400">1998</span>
                <span class="text-xs text-blue-300 mt-1 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>Copa Federal<br/>de Clubes</span>
              </div>

              <div class="flex flex-col items-center">
                <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-800 border-2 border-white/20 text-yellow-400 flex items-center justify-center mb-4 shadow-xl group-hover:bg-yellow-400 group-hover:text-blue-950 group-hover:border-yellow-400 transition-all duration-300 delay-75">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span class="text-3xl font-black font-mono tracking-tight">2007</span>
                <span class="text-xs text-blue-300 mt-1 leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>Nacional<br/>de Clubes</span>
              </div>
            </div>

            <div class="mt-10 text-center text-sm text-blue-200 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
              Estos campeonatos reflejan el trabajo, la dedicación y la pasión que caracteriza a cada jugador
              que representa nuestros colores.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
