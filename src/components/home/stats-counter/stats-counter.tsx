import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const StatsCounter = component$(() => {
  const playersCount = useSignal(0);
  const membersCount = useSignal(0);
  const followersCount = useSignal(0);

  // Animation target values
  const targetPlayers = 1199;
  const targetMembers = 2899;
  const targetFollowers = 61000;

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const duration = 2500; // 2.5 seconds
    const fps = 60;
    const steps = duration / (1000 / fps);
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // ease-out cubic function to make it slow down at the end beautifully
      const ease = 1 - Math.pow(1 - progress, 4);

      playersCount.value = Math.floor(ease * targetPlayers);
      membersCount.value = Math.floor(ease * targetMembers);
      followersCount.value = Math.floor(ease * targetFollowers);

      if (step >= steps) {
        clearInterval(interval);
        playersCount.value = targetPlayers;
        membersCount.value = targetMembers;
        followersCount.value = targetFollowers;
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  });

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US'); // Will result in 1,000
  };

  return (
    <section
      class="w-full bg-[#FFD700] py-16 md:py-24 pb-[calc(4rem+4vw)] md:pb-[calc(6rem+4vw)] relative overflow-hidden flex justify-center border-t-8 border-[#0a1128] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-10"
      style={{
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
        marginBottom: '-4vw'
      }}
    >
      {/* Background shape mimicking the user's reference image */}
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-full bg-black/5 pointer-events-none"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      ></div>

      <div class="container mx-auto px-4 max-w-6xl relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-[#003B73]">

          {/* Jugadores */}
          <div class="flex flex-col items-center justify-center space-y-1">
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>+ DE</span>
            </div>
            <div
              class="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {formatNumber(playersCount.value)}
            </div>
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-lg md:text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>JUGADORES</span>
            </div>
          </div>

          {/* Socios */}
          <div class="flex flex-col items-center justify-center space-y-1">
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>+ DE</span>
            </div>
            <div
              class="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {formatNumber(membersCount.value)}
            </div>
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-lg md:text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>SOCIOS</span>
            </div>
          </div>

          {/* Seguidores */}
          <div class="flex flex-col items-center justify-center space-y-1">
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-sm md:text-base">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>+ DE</span>
            </div>
            <div
              class="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {formatNumber(followersCount.value)}
            </div>
            <div class="flex items-center gap-3 mt-1 pb-1 opacity-80 transition-opacity hover:opacity-100">
              <InstagramIcon />
              <FacebookIcon />
              <XIcon />
            </div>
            <div class="flex items-center gap-2 font-bold uppercase tracking-widest text-lg md:text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              <span>SEGUIDORES</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});
