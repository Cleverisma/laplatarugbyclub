import { component$, useSignal } from '@builder.io/qwik';

export interface LiteYouTubeProps {
  videoId: string;
  title?: string;
}

export const LiteYouTube = component$<LiteYouTubeProps>(({ videoId, title = 'YouTube Video' }) => {
  const isLoaded = useSignal(false);

  return (
    <div
      class="relative aspect-video w-full cursor-pointer group rounded-xl overflow-hidden bg-black/10 flex items-center justify-center shadow-2xl"
      onClick$={() => (isLoaded.value = true)}
    >
      {!isLoaded.value ? (
        <>
          <img
            src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={1280}
            height={720}
            loading="lazy"
          />
          {/* Play Button Overlay */}
          <div class="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:bg-black/10" />
          
          <div class="absolute inset-0 flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 100 100"
              class="drop-shadow-2xl"
            >
              <circle cx="50" cy="50" r="48" fill="#FFD700" />
              <polygon points="42,30 72,50 42,70" fill="#0a1128" />
            </svg>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullscreen
          class="absolute inset-0 w-full h-full border-0"
        />
      )}
    </div>
  );
});
