import { component$, useSignal } from '@builder.io/qwik';
import previewImg from '~/media/preview.avif?url';

const VIDEO_SRC = 'https://pub-78de515207e34bafba279cf5775269df.r2.dev/video_web_lprc.mp4';

export const PromoVideo = component$(() => {
  const isPlaying = useSignal(false);

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

        <div class="w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/10 bg-black relative group">
          <video
            class="w-full aspect-video"
            controls
            playsInline
            muted
            preload="none"
            poster={previewImg}
            src={VIDEO_SRC}
            onPlay$={() => (isPlaying.value = true)}
            onPause$={() => (isPlaying.value = false)}
            onError$={() => { }}
          >
            <track kind="captions" srclang="es" label="Español" />
            Tu navegador no soporta la etiqueta de video.
          </video>

          {!isPlaying.value && (
            <div
              class="hidden md:flex absolute inset-0 items-center justify-center bg-black/30 cursor-pointer group-hover:bg-black/10 transition-all duration-300"
              onClick$={(_, el) => {
                const videoEl = el.previousElementSibling as HTMLVideoElement;
                if (videoEl) {
                  videoEl.play();
                }
              }}
            >
              <div class="w-20 h-20 md:w-28 md:h-28 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)] group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-14 md:w-14 text-[#0a1128] ml-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});
