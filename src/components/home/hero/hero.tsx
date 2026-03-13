import { component$ } from '@builder.io/qwik';
import heroPoster from '~/media/1.jpeg';
import { Button } from '~/components/ui/button/button';

export const Hero = component$(() => {
  return (
    <section
      class="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 92%, 0 100%)' }}
    >
      {/* Video Background */}
      <video
        class="absolute inset-0 w-full h-full object-cover z-0"
        autoplay
        loop
        muted
        playsInline
        poster={heroPoster}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Deep Gradient Overlay */}
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#001f54]/80 to-black/90 z-10 pointer-events-none" />

      {/* Gold tension line at bottom of section */}
      <div class="absolute bottom-0 left-0 w-full h-px bg-yellow-400/60 z-20 pointer-events-none" />

      {/* Content */}
      <div class="relative z-20 text-center px-4 flex flex-col items-center max-w-5xl mx-auto">
        {/* Overline label */}
        <span
          class="text-yellow-400 text-sm tracking-[0.35em] uppercase mb-6 font-semibold"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Primer club de rugby de La Plata · Desde 1934
        </span>

        <h1
          class="text-6xl md:text-9xl font-black text-white mb-6 leading-none drop-shadow-2xl"
          style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: '0.02em' }}
        >
          LA PLATA{' '}
          <span
            class="text-yellow-400 block md:inline"
            style={{ WebkitTextStroke: '0px' }}
          >
            RUGBY CLUB
          </span>
        </h1>

        {/* Divider line */}
        <div class="w-16 h-0.5 bg-yellow-400 mb-6" />

        <p class="text-lg md:text-xl text-gray-300 mb-12 font-light tracking-wide max-w-xl"
           style={{ fontFamily: "'Inter', sans-serif" }}>
          Formamos jugadores. Construimos personas.
        </p>

        <a
          href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block"
        >
          <Button
            look="primary"
            size="lg"
            class="rounded-none bg-yellow-400 text-[#0a1128] border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-400 font-black uppercase tracking-widest text-lg transition-all duration-200 px-12"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Hacete Socio
          </Button>
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="/#institucional"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer hover:text-yellow-300 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-yellow-400/70 hover:text-yellow-400 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
});
