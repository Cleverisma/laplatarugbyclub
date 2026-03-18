import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 bg-blue-950">
      {/* Simple Hero Section */}
      <section class="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden flex items-center justify-center">
        {/* Decorative background element */}
        <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900 rounded-full blur-3xl opacity-30 -mr-64 -mt-64 pointer-events-none" />
        <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-400 rounded-full blur-[120px] opacity-10 -ml-40 -mb-40 pointer-events-none" />
        
        <div class="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div class="inline-flex items-center gap-3 px-5 py-2 bg-white/10 text-yellow-400 font-bold text-sm uppercase tracking-widest rounded-full mb-8 border border-white/10 backdrop-blur-sm">
            <span class="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            La Plata Rugby Club
          </div>
          <h1
            class="text-5xl md:text-7xl font-black mb-6 text-white leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            NUESTRA <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">HISTORIA</span>
          </h1>
          <p class="text-blue-200 text-lg md:text-xl font-light max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Casi un siglo de rugby, valores y amistad en la ciudad de La Plata.
          </p>
        </div>
      </section>

      {/* History Content Section */}
      <section class="py-16 pb-24 relative z-10">
        <div class="container mx-auto px-4 max-w-3xl">
          <div class="space-y-8 text-blue-100 text-lg md:text-xl font-light leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            <p>
              La Plata Rugby Club nació en 1934 con el sueño de un grupo de jugadores platenses que querían
              crear un espacio para disfrutar del rugby y promover este deporte en la ciudad de La Plata.
            </p>
            <p>
              Desde sus comienzos, el club se construyó sobre una base clara de valores: el respeto, el
              compañerismo, la solidaridad y el compromiso con la formación de personas a través del deporte.
            </p>
            
            <div class="py-8 my-8 border-y border-white/10">
              <figure class="relative pl-8 py-4 before:absolute before:inset-y-0 before:left-0 before:w-2 before:bg-yellow-400 before:rounded-r-full">
                <blockquote
                  class="text-2xl md:text-3xl font-bold italic text-white leading-tight"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  "Formar buenas personas que disfruten del rugby."
                </blockquote>
                <figcaption class="mt-4 text-sm text-blue-300 font-light" style={{ fontFamily: "'Inter', sans-serif" }}>
                  — Lema histórico de nuestra institución
                </figcaption>
              </figure>
            </div>

            <p>
              Con el paso de los años, generaciones de jugadores, entrenadores, dirigentes y familias fueron
              dejando su huella y aportando su esfuerzo para que el club siga creciendo.
            </p>
            <p>
              A lo largo de nuestra historia, hemos alcanzado logros deportivos memorables. Entre ellos,
              destacan tres grandes hitos con nuestra Primera División:
            </p>
            
            <ul class="space-y-4 my-8 list-none pl-0">
              <li class="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <span class="text-2xl font-black text-yellow-400" style={{ fontFamily: "'Oswald', sans-serif" }}>1995</span>
                <span class="text-base text-blue-100 italic">Campeón de la UAR</span>
              </li>
              <li class="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <span class="text-2xl font-black text-yellow-400" style={{ fontFamily: "'Oswald', sans-serif" }}>1998</span>
                <span class="text-base text-blue-100 italic">Copa Federal de Clubes</span>
              </li>
              <li class="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                <span class="text-2xl font-black text-yellow-400" style={{ fontFamily: "'Oswald', sans-serif" }}>2007</span>
                <span class="text-base text-blue-100 italic">Nacional de Clubes</span>
              </li>
            </ul>

            <p>
              Estos campeonatos reflejan el trabajo, la dedicación y la pasión que caracteriza a cada jugador
              que representa nuestros colores, pero son solo una parte de nuestra identidad.
            </p>
            <p>
              Hoy, seguimos manteniendo el mismo espíritu que inspiró
              a nuestros fundadores. La historia del club no es solo su pasado, sino también su presente y su futuro. Cada entrenamiento,
              cada partido y cada encuentro en el club continúa escribiendo nuevas páginas de esta historia.{' '}
              <strong class="font-semibold text-white block mt-6 text-2xl text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                Más que un club, somos una familia.
              </strong>
            </p>
          </div>
          
          <div class="mt-20 text-center">
             <a href="/" class="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-transparent hover:border-white pb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                ← Volver al inicio
             </a>
          </div>
        </div>
      </section>
    </main>
  );
});

export const head: DocumentHead = {
  title: 'Nuestra Historia | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conocé la historia de La Plata Rugby Club. Casi un siglo formando buenas personas que disfrutan del rugby en la ciudad de La Plata.',
    },
  ],
};
