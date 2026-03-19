import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import img7 from '~/media/7.jpeg';
import img10 from '~/media/10.jpeg';
import img11 from '~/media/11.jpeg';
import img14 from '~/media/14.jpeg';

export const head: DocumentHead = {
  title: 'Historia, Valores y Pasión desde 1934 | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conocé la historia de La Plata Rugby Club. Desde 1934, formando buenas personas que disfruten del rugby. Campeones del Nacional de Clubes en 1995, 1998 y 2007.',
    },
  ],
};

const CHAMPIONSHIPS = [
  { year: '1995', title: 'Nacional de Clubes' },
  { year: '1998', title: 'Nacional de Clubes' },
  { year: '2007', title: 'Nacional de Clubes' },
];

const VALUES = [
  { icon: '🤝', title: 'Respeto', description: 'Base de toda relación dentro y fuera de la cancha.' },
  { icon: '💪', title: 'Solidaridad', description: 'Un club que se construye entre todos, ayudándonos mutuamente.' },
  { icon: '🏉', title: 'Disciplina', description: 'El esfuerzo diario nos convierte en mejores jugadores y personas.' },
  { icon: '❤️', title: 'Pasión', description: 'Amamos este deporte y lo transmitimos de generación en generación.' },
  { icon: '🤲', title: 'Compañerismo', description: 'El tercer tiempo es tan importante como los 80 minutos de juego.' },
  { icon: '🎯', title: 'Compromiso', description: 'Con el club, con los compañeros y con la comunidad.' },
];

export default component$(() => {
  return (
    <main class="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1128 0%, #001f54 30%, #0a1128 100%)' }}>
      {/* Hero */}
      <section class="relative pt-40 pb-20 md:pt-48 md:pb-28 overflow-hidden">
        {/* Subtle grid */}
        <div
          class="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div class="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Label */}
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px w-16 bg-yellow-400" />
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Desde 1934
            </span>
          </div>

          <h1
            class="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] mb-8"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            HISTORIA, VALORES<br />
            <span class="text-yellow-400">Y PASIÓN</span>
          </h1>

          <div class="w-24 h-1 bg-yellow-400 mb-8" />

          <p
            class="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Bienvenidos a La Plata Rugby Club. Una institución que trasciende el deporte para ser parte de la identidad de nuestra ciudad.
          </p>
        </div>
      </section>

      {/* History Content */}
      <section class="relative pb-20 md:pb-28">
        <div class="container mx-auto px-4 max-w-3xl relative z-10">
          <article class="space-y-8 text-gray-300 text-lg leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <p>
              La Plata Rugby Club forma parte de la historia del rugby argentino desde <strong class="text-white">1934</strong>. Con más de 90 años de trayectoria, se ha consolidado como uno de los clubes más importantes del país, distinguido no solo por sus logros deportivos sino por su compromiso con la formación integral de las personas.
            </p>

            <p>
              Fundado por un grupo de jóvenes platenses apasionados por el deporte, el club creció con la ciudad y se convirtió en un referente del rugby a nivel nacional e internacional. A lo largo de casi un siglo, LPRC ha sido la cuna de extraordinarios jugadores que vistieron la camiseta de Los Pumas, llevando con orgullo los colores azul y oro a los escenarios más prestigiosos del mundo.
            </p>

            <p>
              Nuestras inferiores son reconocidas por su altísimo nivel competitivo y formativo. Desde las categorías más chicas, los jugadores aprenden los valores fundamentales del rugby: el respeto por el rival, la solidaridad dentro y fuera del campo, la disciplina como herramienta de crecimiento, y la pasión por este deporte que nos une.
            </p>

            <blockquote class="border-l-4 border-yellow-400 pl-8 py-4 my-12 bg-yellow-400/5">
              <p class="text-white text-xl md:text-2xl font-bold italic" style={{ fontFamily: "'Inter', sans-serif" }}>
                "Formar buenas personas que disfruten del rugby."
              </p>
              <cite class="block mt-3 text-yellow-400 text-sm font-bold uppercase tracking-widest not-italic" style={{ fontFamily: "'Oswald', sans-serif" }}>
                — Filosofía del Club
              </cite>
            </blockquote>

            <p>
              El club vive y respira rugby en todas sus categorías: desde las escuelitas donde los más pequeños dan sus primeros pasos, pasando por juveniles de primer nivel, hasta un plantel superior que compite al más alto nivel en las principales competencias del país.
            </p>

            <p>
              Pero La Plata Rugby Club es mucho más que un equipo de rugby. Es un espacio de encuentro para familias, un lugar donde se forjan amistades para toda la vida, y una comunidad que trabaja permanentemente para ofrecer lo mejor a sus socios. El tercer tiempo, tan emblemático del rugby, encuentra en nuestro club uno de sus mejores exponentes: un momento para compartir, celebrar y fortalecer los lazos que nos unen.
            </p>
          </article>

          {/* History Gallery */}
          <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={img7} alt="Historia LPRC 1" width={800} height={600} class="w-full h-64 md:h-80 object-cover rounded-2xl border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
            <img src={img10} alt="Historia LPRC 2" width={800} height={600} class="w-full h-64 md:h-80 object-cover rounded-2xl border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
            <img src={img11} alt="Historia LPRC 3" width={800} height={600} class="w-full h-64 md:h-80 object-cover rounded-2xl border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
            <img src={img14} alt="Historia LPRC 4" width={800} height={600} class="w-full h-64 md:h-80 object-cover rounded-2xl border border-white/10 shadow-lg grayscale hover:grayscale-0 transition-all duration-500" loading="lazy" />
          </div>

        </div>
      </section>

      {/* Championships */}
      <section class="py-20 md:py-28 relative">
        <div
          class="absolute inset-0 bg-yellow-400/5 pointer-events-none"
          style={{ clipPath: 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)' }}
        />
        <div class="container mx-auto px-4 max-w-5xl relative z-10">
          <div class="text-center mb-16">
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs block mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Palmarés
            </span>
            <h2
              class="text-4xl md:text-5xl font-black text-white uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              CAMPEONES <span class="text-yellow-400">NACIONALES</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {CHAMPIONSHIPS.map((champ) => (
              <div
                key={champ.year}
                class="relative bg-[#0a1128] border border-yellow-400/30 p-8 text-center group hover:border-yellow-400 transition-all duration-300"
              >
                <div class="absolute top-0 left-0 w-full h-1 bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span
                  class="text-6xl md:text-7xl font-black text-yellow-400 block mb-2"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {champ.year}
                </span>
                <span
                  class="text-sm text-gray-400 uppercase tracking-widest font-bold"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {champ.title}
                </span>
                <div class="mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 mx-auto text-yellow-400/50 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={1.5}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.27.988v2.534" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section class="py-20 md:py-28">
        <div class="container mx-auto px-4 max-w-5xl">
          <div class="text-center mb-16">
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs block mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Lo que nos define
            </span>
            <h2
              class="text-4xl md:text-5xl font-black text-white uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              NUESTROS <span class="text-yellow-400">VALORES</span>
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <div
                key={value.title}
                class="bg-white/5 border border-white/10 p-8 hover:border-yellow-400/40 transition-all duration-300 group"
              >
                <span class="text-3xl mb-4 block">{value.icon}</span>
                <h3
                  class="text-xl font-black text-white uppercase tracking-wider mb-3 group-hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {value.title}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section class="py-20 text-center border-t border-white/10">
        <div class="container mx-auto px-4 max-w-3xl">
          <h2
            class="text-3xl md:text-4xl font-black text-white uppercase mb-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            SUMATE A <span class="text-yellow-400">LA FAMILIA LPRC</span>
          </h2>
          <p class="text-gray-400 text-lg mb-10 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Consultá por nuestros nuevos planes familiares y sé parte de un club con historia, valores y pasión.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20y%20quiero%20sumarme%20al%20club"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 bg-yellow-400 text-[#0a1128] px-10 py-4 font-black uppercase tracking-widest text-base hover:bg-white transition-all duration-300 shadow-lg"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            SUMATE
          </a>
        </div>
      </section>
    </main>
  );
});
