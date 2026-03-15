import { component$ } from '@builder.io/qwik';

export const Hero = component$(() => {
  return (
    <section
      class="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <div class="absolute inset-0 w-full h-full z-0">
        <video
          autoplay
          loop
          muted
          playsInline
          class="w-full h-full object-cover origin-center opacity-80"
        >
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
      </div>

      {/* Dark Overlay for Text Contrast */}
      <div class="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

      {/* Giant Foreground Text */}
      <div class="relative z-20 flex flex-col items-center justify-center pointer-events-none w-full px-4">
        <h1
          class="text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] xl:text-[9rem] text-[#FFD700] font-black uppercase tracking-tighter leading-none text-center"
          style={{
            fontFamily: "'Oswald', sans-serif",
            textShadow: `
              1px 1px 0 #0a1128,
              2px 2px 0 #0a1128,
              3px 3px 0 #0a1128,
              4px 4px 0 #0047AB,
              5px 5px 0 #0047AB,
              6px 6px 0 #0047AB,
              7px 7px 0 #0047AB,
              8px 8px 0 #0047AB,
              9px 9px 0 #0047AB,
              10px 10px 0 #0047AB,
              11px 11px 0 #0047AB,
              12px 12px 0 #0047AB,
              20px 20px 30px rgba(0, 0, 0, 0.7),
              0 0 50px rgba(0, 0, 0, 0.5)
            `
          }}
        >
          LA PLATA
          <span class="block text-[#FFD700] mt-[-1%]">RUGBY CLUB</span>
        </h1>
      </div>

    </section>
  );
});
