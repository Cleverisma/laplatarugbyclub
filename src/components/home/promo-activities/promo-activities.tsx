import { component$ } from '@builder.io/qwik';

export const PromoActivities = component$(() => {
  return (
    <section class="relative py-28 md:py-36 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1128 0%, #0d1a3a 50%, #0a1128 100%)' }}>
      {/* Geometric decorations */}
      <div class="absolute top-0 right-0 w-72 h-72 border border-yellow-400/10 rotate-45 translate-x-36 -translate-y-36 pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-96 h-96 border border-yellow-400/5 rotate-12 -translate-x-48 translate-y-48 pointer-events-none" />
      <div
        class="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,215,0,0.3) 60px, rgba(255,215,0,0.3) 61px)',
        }}
      />

      <div class="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Small label */}
        <div class="flex items-center gap-4 mb-6">
          <div class="h-px w-16 bg-yellow-400" />
          <span
            class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Comunidad
          </span>
        </div>

        {/* Main title */}
        <h2
          class="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.9] mb-8"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          VIVÍ EL CLUB<br />
          <span class="text-yellow-400">EN TODAS SUS FORMAS</span>
        </h2>

        {/* Accent line */}
        <div class="w-24 h-1 bg-yellow-400 mb-10" />

        {/* Subtitle */}
        <p
          class="text-2xl md:text-3xl font-black text-white/90 uppercase tracking-wider mb-8"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Mientras los chicos entrenan...
        </p>

        {/* Body text */}
        <div class="max-w-3xl space-y-6 mb-12">
          <p class="text-gray-300 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Los invitamos también a aprovechar el club con actividades como <strong class="text-white">yoga</strong> y <strong class="text-white">running</strong>, abiertas para toda la familia. El club es mucho más que rugby: es un lugar donde compartir, moverse y crecer juntos.
          </p>
          <p class="text-gray-300 text-lg md:text-xl leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
            Disfrutá de nuestras canchas, espacios verdes y una comunidad que te recibe con los brazos abiertos. Acá hay lugar para todos.
          </p>
        </div>

        {/* CTA block */}
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20y%20quiero%20consultar%20por%20los%20planes%20familiares"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 bg-yellow-400 text-[#0a1128] px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 shadow-lg shadow-yellow-400/20 group"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.84 6.366L.041 24l5.808-1.503A12 12 0 0 0 11.944 24c6.627 0 12-5.373 12-12S18.571 0 11.944 0zm0 21.932c-1.848 0-3.664-.482-5.263-1.392l-.377-.216-3.837.994.992-3.69-.25-.395a9.927 9.927 0 0 1-1.512-5.301c0-5.465 4.445-9.91 9.913-9.91s9.911 4.445 9.911 9.91-4.445 9.91-9.91 9.91c0 .001-.004.001-.014.001z" />
            </svg>
            Consultá por planes familiares
          </a>
          <a
            href="/historia"
            class="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors uppercase tracking-widest text-xs font-bold border-b border-transparent hover:border-yellow-400 pb-px"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Conocé nuestra historia <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
});
