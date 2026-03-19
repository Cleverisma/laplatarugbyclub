import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const StatsCounter = component$(() => {
  const playersCount = useSignal(0);
  const membersCount = useSignal(0);
  const followersCount = useSignal(0);

  // Animation target values
  const targetPlayers = 1000;
  const targetMembers = 2500;
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
