import { component$ } from '@builder.io/qwik';

export interface VerticalVideoProps {
  videos: {
    id: string;
    title: string;
    videoUrl: string;
    thumbnailUrl: string | null;
    isActive: number;
    displayOrder: number;
    createdAt: string;
  }[];
}

export const VerticalVideo = component$<VerticalVideoProps>(({ videos }) => {
  return (
    <section class="relative py-24 md:py-32 bg-[#0a1128] overflow-hidden">
      {/* Subtle background texture */}
      <div
        class="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,215,0,0.4) 40px, rgba(255,215,0,0.4) 41px)',
        }}
      />

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 justify-items-center items-center w-full">
          
          {videos.map((video) => (
            <div key={video.id} class="relative w-full max-w-[300px]">
              <div class="relative bg-black rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 w-full" style={{ aspectRatio: '9/16' }}>
                <video
                  src={video.videoUrl}
                  poster={video.thumbnailUrl || undefined}
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
          ))}

        </div>
      </div>
    </section>
  );
});
