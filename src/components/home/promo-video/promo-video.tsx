import { component$ } from '@builder.io/qwik';
import { LiteYouTube } from '~/components/ui/lite-youtube';

export const PromoVideo = component$(() => {
  return (
    <section
      id="promo-video"
      class="py-24 md:py-32 relative bg-[#0a1128] overflow-hidden flex flex-col items-center justify-center border-t border-gray-900"
    >
      <div class="container mx-auto px-4 max-w-6xl w-full relative z-10 flex flex-col items-center">
        <h2
          class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-12 lg:mb-16 leading-none tracking-tighter uppercase text-center drop-shadow-lg"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          EL CLUB DESDE <span class="text-yellow-400">ADENTRO</span>
        </h2>
        
        <div class="w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/10 bg-black">
          <LiteYouTube videoId="CG0Tm0oQ5Tg" title="Video Institucional La Plata Rugby Club" />
        </div>
      </div>
    </section>
  );
});
