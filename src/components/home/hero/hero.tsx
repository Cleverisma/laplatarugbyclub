import { component$ } from '@builder.io/qwik';
// Use the new hero video
import heroVideo from '~/media/hero-video.mp4';

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
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay for Text Contrast */}
      <div class="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

      {/* Giant Foreground Text */}
      <div class="relative z-20 flex flex-col items-center justify-center pointer-events-none w-full px-4">
        <h1 
          class="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] text-white font-black uppercase tracking-tighter leading-none text-center drop-shadow-2xl"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          LA PLATA
          <span class="block text-yellow-400 mt-[-1%]">RUGBY CLUB</span>
        </h1>
      </div>
      
    </section>
  );
});
