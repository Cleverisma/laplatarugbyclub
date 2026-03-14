import { component$ } from '@builder.io/qwik';
import promoVideo from '~/media/hero-video.mp4';

export const PromoVideo = component$(() => {
  return (
    <section
      id="promo-video"
      class="py-24 md:py-32 relative border-t border-gray-900 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0a1128 0%, #000000 100%)' }}
    >
      {/* Decorative background elements */}
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content Left Side */}
          <div class="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
            <span
              class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-xs lg:text-sm mb-4 block"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Viví la Experiencia LPRC
            </span>
            <h2
              class="text-5xl md:text-7xl font-black text-white mb-6 leading-none"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              TU LUGAR EN <br />
              <span class="text-yellow-400">EL MUNDO</span>
            </h2>
            <div class="h-px w-20 bg-yellow-400 mx-auto lg:mx-0 mb-8" />
            <p
              class="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No es solo un club, es una familia. Vení a disfrutar del deporte, la amistad y los valores que nos unen. Seguinos de cerca en nuestras redes sociales y acompañá cada una de nuestras divisiones.
            </p>
            
            <div class="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <a
                href="https://www.instagram.com/laplatarugby/"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold py-4 px-8 rounded-none transition-all duration-300 uppercase tracking-widest text-sm inline-flex items-center group w-full sm:w-auto justify-center"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Seguinos en IG
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Video Container Right Side */}
          <div class="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div class="relative w-[280px] md:w-[320px] lg:w-[350px] aspect-[9/16] transform lg:rotate-2 shadow-2xl group transition-transform duration-500 hover:rotate-0">
              {/* Outer decorative border */}
              <div class="absolute -inset-2 bg-gradient-to-tr from-yellow-400 to-transparent opacity-30 group-hover:opacity-60 blur-sm rounded-xl transition-opacity duration-500" />
              
              <div class="absolute inset-0 border border-yellow-400/50 rounded-xl z-10 pointer-events-none mix-blend-overlay" />
              
              {/* Main Video Element */}
              <div class="w-full h-full rounded-xl overflow-hidden shadow-[0_0_40px_rgba(250,204,21,0.15)] relative bg-black">
                <video
                  class="w-full h-full object-cover object-center"
                  autoplay
                  loop
                  muted
                  playsInline
                  controls={false}
                >
                  <source src={promoVideo} type="video/mp4" />
                  Tu navegador no soporta videos HTML5.
                </video>
                
                {/* Playing indicator / Overlay subtle */}
                <div class="absolute bottom-4 left-4 z-20 flex items-center space-x-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span class="text-[10px] uppercase font-bold text-white tracking-widest" style={{ fontFamily: "'Inter', sans-serif" }}>Live</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
