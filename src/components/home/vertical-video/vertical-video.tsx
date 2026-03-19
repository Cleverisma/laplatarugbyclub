import { component$ } from '@builder.io/qwik';
import preview2Img from '~/media/preview-2.png?url';
import preview3Img from '~/media/preview-3.png?url';

export const VerticalVideo = component$(() => {
  return (
    <section class="relative py-24 md:py-32 bg-[#0a1128] overflow-hidden">
      {/* Subtle background texture */}
      <div
        class="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,215,0,0.4) 40px, rgba(255,215,0,0.4) 41px)',
        }}
      />

      <div class="container mx-auto px-4 max-w-5xl relative z-10">
        <div class="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
          
          {/* Video 1 */}
          <div class="relative max-w-sm mx-auto">
            <div class="relative bg-black rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10" style={{ aspectRatio: '9/16', width: '300px', maxWidth: '100%' }}>
              <video
                src="/videos/2.mp4"
                poster={preview2Img}
                preload="none"
                class="w-full h-full object-cover"
                controls
                playsInline
                loop
                muted
              />
            </div>
            {/* Glow effect */}
            <div class="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full -z-10" />
          </div>

          {/* Video 2 */}
          <div class="relative max-w-sm mx-auto">
            <div class="relative bg-black rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10" style={{ aspectRatio: '9/16', width: '300px', maxWidth: '100%' }}>
              <video
                src="/videos/3.mp4"
                poster={preview3Img}
                preload="none"
                class="w-full h-full object-cover"
                controls
                playsInline
                loop
                muted
              />
            </div>
            {/* Glow effect */}
            <div class="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
});
