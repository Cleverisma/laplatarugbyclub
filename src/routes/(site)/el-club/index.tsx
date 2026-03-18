import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import bgImage from '~/media/3.jpeg';

export default component$(() => {
  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 bg-white pb-32">
      {/* Hero Header */}
      <section
        class="relative h-[50vh] min-h-[400px] w-full bg-[#0a1128] flex items-center justify-center pt-32 bg-cover bg-center"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '4vw',
          backgroundImage: `linear-gradient(rgba(10, 17, 40, 0.85), rgba(10, 17, 40, 0.95)), url(${bgImage})`
        }}
      >
        <div class="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none" />
        <h1
          class="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter shadow-sm z-10"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          EL CLUB
        </h1>
      </section>

      <div class="container mx-auto px-4 max-w-5xl mt-12 space-y-24">

        {/* Intro Blocks */}
        <section class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 text-gray-800 text-lg md:text-xl leading-relaxed font-light">
          {/* Left Column — Origins + Community */}
          <div class="space-y-8">
            <h2
              class="text-4xl md:text-5xl font-black text-[#0a1128] tracking-tight uppercase mb-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nuestra Historia
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              La Plata Rugby Club forma parte de la historia del rugby argentino desde 1934, siendo el{' '}
              <strong class="font-semibold text-[#0a1128]">primer club de rugby de la ciudad de La Plata.</strong>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              El club nació gracias a la iniciativa de un grupo de jugadores platenses que soñaban con fundar
              una institución donde pudieran disfrutar del rugby, difundir este deporte en la ciudad y contribuir
              a la formación de buenas personas a través de sus valores.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              Hoy, más de nueve décadas después, ese espíritu continúa intacto. Nuestro objetivo sigue siendo
              el mismo:{' '}
              <strong class="font-bold text-[#0a1128] bg-yellow-400 px-1">
                "Formar buenas personas que disfruten del rugby."
              </strong>
            </p>

            {/* Un club, una comunidad */}
            <div class="pt-8 border-t border-gray-200">
              <h3
                class="text-2xl font-black text-[#0a1128] mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Un club, una comunidad
              </h3>
              <p class="mb-5 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Para todos nosotros, "El Club" es mucho más que un lugar para entrenar o competir. Es un espacio donde:
              </p>
              <ul class="space-y-3 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[
                  'Nacen amistades que duran toda la vida',
                  'Se comparten valores y experiencias',
                  'Se aprende a trabajar en equipo',
                  'Se disfruta del deporte en comunidad',
                ].map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1.5 w-2 h-2 bg-yellow-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p class="mt-5 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Aquí vivimos el rugby con los valores que nos representan:{' '}
                <strong class="font-semibold text-[#0a1128]">
                  respeto, solidaridad, humildad y compañerismo.
                </strong>
              </p>
            </div>
          </div>

          {/* Right Column — Más que rugby + Invitation */}
          <div class="space-y-8">
            <div class="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative overflow-hidden group hover:border-yellow-400 transition-colors shadow-sm">
              <div class="absolute -right-4 -top-4 text-7xl opacity-5 transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">🏆</div>
              <h3
                class="text-2xl font-black text-[#0a1128] mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Más que rugby
              </h3>
              <p class="text-base mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                El club es un espacio donde se construyen experiencias que van más allá del deporte. Es el lugar donde:
              </p>
              <ul class="space-y-3 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[
                  'Compartimos momentos inolvidables',
                  'Aprendemos unos de otros',
                  'Formamos nuevas generaciones',
                  'Fortalecemos la comunidad',
                ].map((item) => (
                  <li key={item} class="flex items-start gap-3 font-medium">
                    <span class="mt-1.5 w-2 h-2 bg-[#0a1128] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p class="mt-5 text-base font-semibold text-[#0a1128]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Para quienes forman parte del club, es una segunda casa.
              </p>
            </div>

            <div class="pt-4 border-t border-gray-200">
              <p class="text-[#0a1128] text-xl font-medium mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Te invitamos a conocernos
              </p>
              <p class="text-base text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                Si querés acercarte al rugby, conocer nuestra comunidad o sumarte a nuestras actividades,
                las puertas del club están abiertas. Te invitamos a visitar La Plata Rugby Club, conocer
                nuestras instalaciones y formar parte de esta historia que sigue creciendo.
              </p>
              <strong
                class="font-black text-[#0a1128] uppercase tracking-wide mt-6 block text-xl bg-yellow-400 inline-block px-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Siempre serás bienvenido.
              </strong>
            </div>
          </div>
        </section>

        {/* Diagonal Transition Div */}
        <div
          class="w-full h-16 bg-yellow-400 my-16"
          style={{ clipPath: 'polygon(0 0, 100% 50%, 100% 100%, 0 50%)' }}
        />

        {/* Achievements Section */}
        <section class="max-w-4xl mx-auto">
          <div class="bg-[#0a1128] p-10 md:p-14 border border-gray-800 shadow-2xl relative overflow-hidden group">
            <div class="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5 pointer-events-none" />

            <h3
              class="text-3xl md:text-5xl font-black mb-4 text-center text-white tracking-tight uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Nuestros logros <span class="text-yellow-400">deportivos</span>
            </h3>
            <p class="text-center text-gray-400 text-lg mb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
              Tres títulos nacionales con nuestra Primera División
            </p>

            <div class="grid grid-cols-3 gap-6 text-center">
              <div class="flex flex-col items-center">
                <div class="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/20 text-white flex items-center justify-center mb-4 shadow-xl group-hover:bg-yellow-400 group-hover:text-[#0a1128] group-hover:border-yellow-400 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span class="text-3xl font-black font-mono tracking-tight text-white group-hover:text-yellow-400 transition-colors">1995</span>
                <span class="text-xs text-gray-400 mt-1 leading-tight uppercase font-medium tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Campeón<br />de la UAR</span>
              </div>

              <div class="flex flex-col items-center transform -translate-y-4">
                <div class="w-24 h-24 md:w-28 md:h-28 bg-yellow-400 text-[#0a1128] flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(250,204,21,0.3)] relative z-10 transition-transform duration-300 hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 md:h-14 md:w-14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7.4-6.3-4.8-6.3 4.8 2.3-7.4-6-4.6h7.6z" />
                  </svg>
                </div>
                <span class="text-4xl font-black font-mono tracking-tight text-yellow-400 drop-shadow-lg">1998</span>
                <span class="text-xs text-gray-400 mt-1 leading-tight uppercase font-medium tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Copa Federal<br />de Clubes</span>
              </div>

              <div class="flex flex-col items-center">
                <div class="w-20 h-20 md:w-24 md:h-24 bg-white/5 border border-white/20 text-white flex items-center justify-center mb-4 shadow-xl group-hover:bg-yellow-400 group-hover:text-[#0a1128] group-hover:border-yellow-400 transition-all duration-300 delay-75">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span class="text-3xl font-black font-mono tracking-tight text-white group-hover:text-yellow-400 transition-colors">2007</span>
                <span class="text-xs text-gray-400 mt-1 leading-tight uppercase font-medium tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>Nacional<br />de Clubes</span>
              </div>
            </div>

            <div class="mt-12 text-center text-sm text-gray-400 leading-relaxed font-light px-8" style={{ fontFamily: "'Inter', sans-serif" }}>
              Estos campeonatos reflejan el trabajo, la dedicación y la pasión que caracteriza a cada jugador
              que representa nuestros colores.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'El Club | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conoce la historia, los valores y los logros deportivos de La Plata Rugby Club. El primer club de rugby de la ciudad.',
    },
  ],
};
