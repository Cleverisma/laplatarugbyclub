import { component$ } from '@builder.io/qwik';

export const Institutional = component$(() => {
  return (
    <section id="institucional" class="w-full bg-blue-950 py-24 lg:py-32 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section header */}
        <div class="flex items-center gap-4 mb-4">
          <div class="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-yellow-400 border-b-[8px] border-b-transparent" />
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Bienvenidos a La Plata Rugby Club
          </h2>
        </div>
        <p
          class="text-yellow-400/80 uppercase tracking-widest text-sm font-semibold mb-16 md:mb-20 pl-7"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Historia, valores y pasión por el rugby desde 1934
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 text-blue-100 text-lg md:text-xl leading-relaxed font-light">
          {/* Left Column — Origins + Community */}
          <div class="space-y-8">
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              La Plata Rugby Club forma parte de la historia del rugby argentino desde 1934, siendo el{' '}
              <strong class="font-semibold text-white">primer club de rugby de la ciudad de La Plata.</strong>
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              El club nació gracias a la iniciativa de un grupo de jugadores platenses que soñaban con fundar
              una institución donde pudieran disfrutar del rugby, difundir este deporte en la ciudad y contribuir
              a la formación de buenas personas a través de sus valores.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif" }}>
              Hoy, más de nueve décadas después, ese espíritu continúa intacto. Nuestro objetivo sigue siendo
              el mismo:{' '}
              <strong class="font-semibold text-yellow-400">
                "Formar buenas personas que disfruten del rugby."
              </strong>
            </p>

            {/* Un club, una comunidad */}
            <div class="pt-4 border-t border-blue-900/50">
              <h3
                class="text-2xl font-black text-white mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Un club, una comunidad
              </h3>
              <p class="mb-5 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Para todos nosotros, "El Club" es mucho más que un lugar para entrenar o competir. Es un espacio donde:
              </p>
              <ul class="space-y-3 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[
                  'nacen amistades que duran toda la vida',
                  'se comparten valores y experiencias',
                  'se aprende a trabajar en equipo',
                  'se disfruta del deporte en comunidad',
                ].map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1.5 w-2 h-2 bg-yellow-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p class="mt-5 text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                Aquí vivimos el rugby con los valores que nos representan:{' '}
                <strong class="font-semibold text-white">
                  respeto, solidaridad, humildad y compañerismo.
                </strong>
              </p>
            </div>
          </div>

          {/* Right Column — Más que rugby + Invitation */}
          <div class="space-y-8">
            <div class="bg-blue-900/30 p-8 rounded-2xl border border-blue-800/50 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
              <div class="absolute -right-4 -top-4 text-7xl opacity-5 transform group-hover:scale-110 transition-transform duration-500 pointer-events-none">🏆</div>
              <h3
                class="text-2xl font-black text-white mb-4 uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Más que rugby
              </h3>
              <p class="text-base mb-5 text-blue-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                El club es un espacio donde se construyen experiencias que van más allá del deporte. Es el lugar donde:
              </p>
              <ul class="space-y-3 text-base text-blue-100" style={{ fontFamily: "'Inter', sans-serif" }}>
                {[
                  'compartimos momentos inolvidables',
                  'aprendemos unos de otros',
                  'formamos nuevas generaciones',
                  'fortalecemos la comunidad',
                ].map((item) => (
                  <li key={item} class="flex items-start gap-3">
                    <span class="mt-1.5 w-2 h-2 bg-yellow-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p class="mt-5 text-base font-semibold text-yellow-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                Para quienes forman parte del club, es una segunda casa.
              </p>
            </div>

            <div class="pt-4 border-t border-blue-900/50">
              <p class="text-white text-xl font-medium mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                Te invitamos a conocernos
              </p>
              <p class="text-base text-blue-200" style={{ fontFamily: "'Inter', sans-serif" }}>
                Si querés acercarte al rugby, conocer nuestra comunidad o sumarte a nuestras actividades,
                las puertas del club están abiertas. Te invitamos a visitar La Plata Rugby Club, conocer
                nuestras instalaciones y formar parte de esta historia que sigue creciendo.
              </p>
              <strong
                class="font-bold text-white uppercase tracking-wide mt-4 block"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Siempre serás bienvenido.
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
