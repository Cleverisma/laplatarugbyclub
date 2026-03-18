import { component$ } from '@builder.io/qwik';

const VIDEO_SRC = 'https://pub-78de515207e34bafba279cf5775269df.r2.dev/video_web_lprc.mp4';

export const PromoVideo = component$(() => {
  return (
    <section
      id="promo-video"
      class="py-24 md:py-32 relative bg-[#0a1128] overflow-hidden flex flex-col items-center justify-center border-t border-gray-900"
    >
      <div class="w-full px-4 relative z-10 flex flex-col items-center">
        <h2
          class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-12 lg:mb-16 leading-none tracking-tighter uppercase text-center drop-shadow-lg"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          EL CLUB DESDE <span class="text-yellow-400">ADENTRO</span>
        </h2>

        <div class="w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/10 bg-black">
          <video
            class="w-full aspect-video"
            controls
            playsInline
            preload="metadata"
            src={VIDEO_SRC}
          >
            Tu navegador no soporta la etiqueta de video.
          </video>
        </div>
      </div>
    </section>
  );
});
