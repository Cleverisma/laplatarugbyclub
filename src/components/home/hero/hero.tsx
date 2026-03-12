import { component$ } from '@builder.io/qwik';
import heroPoster from '~/media/1.jpeg';

export const Hero = component$(() => {
  return (
    <section class="relative h-screen w-full overflow-hidden flex items-center justify-center bg-blue-950">
      {/* Video Background */}
      <video 
        class="absolute inset-0 w-full h-full object-cover z-0"
        autoplay 
        loop 
        muted 
        playsInline
        poster={heroPoster}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for better text readability */}
      <div class="absolute inset-0 bg-blue-950/60 z-10 pointer-events-none"></div>

      {/* Content */}
      <div class="relative z-20 text-center px-4 flex flex-col items-center max-w-5xl mx-auto">
        <h1 class="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight uppercase drop-shadow-lg">
          La Plata <span class="text-yellow-400">Rugby Club</span>
        </h1>
        <p class="text-2xl md:text-3xl text-gray-200 mb-12 font-medium drop-shadow-md">
          Formar buenas personas que disfruten del rugby.
        </p>
        <button class="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold py-5 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
          Hacete Socio
        </button>
      </div>
      
      {/* Scroll indicator */}
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce pointer-events-none">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
         </svg>
      </div>
    </section>
  );
});
