import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import img1 from '~/media/1.jpeg';
import img2 from '~/media/6.jpeg';
import img3 from '~/media/7.jpeg';
import img4 from '~/media/14.jpeg';
import img5 from '~/media/18.jpeg';

export const Hero = component$(() => {
  const images = [img1, img2, img3, img4, img5];
  const activeIndex = useSignal(0);

  // Auto-advance slider every 7.5 seconds
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % images.length;
    }, 7500);
    
    cleanup(() => clearInterval(interval));
  });

  return (
    <section 
      class="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center bg-black z-20"
      style={{ 
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6vw), 0 100%)',
        marginBottom: '-6vw'
      }}
    >
      {/* Background Images Slider */}
      {images.map((src, idx) => {
        const isActive = idx === activeIndex.value;
        return (
          <div
            key={idx}
            class={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-80 z-10' : 'opacity-0 z-0'}`}
          >
             <img
               src={src}
               alt={`Hero Slide ${idx + 1}`}
               width="1920"
               height="1080"
               class="w-full h-full object-cover origin-center bg-black"
               style={{
                 // Apply a slow pan and scale when active, reset otherwise
                 transform: isActive ? 'scale(1.15) translateX(-3%)' : 'scale(1) translateX(0)',
                 transition: isActive ? 'transform 10s linear' : 'none'
               }}
               fetchPriority={idx === 0 ? "high" : "auto"}
               decoding={idx === 0 ? "sync" : "async"}
             />
          </div>
        );
      })}

      {/* Solid Dark Gradient Overlay for the bottom section to smoothly transition into MatchCenter */}
      <div class="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-black/20 z-20 pointer-events-none" />
      
      {/* Visual cue to encourage scrolling down to the MatchCenter */}
      <div class="absolute z-30 bottom-[8vw] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center opacity-80 pointer-events-none">
        <span 
          class="text-white text-xs md:text-sm font-semibold uppercase tracking-widest mb-2"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Desliza
        </span>
        <div class="w-[2px] h-12 bg-white/20 overflow-hidden relative">
           <div class="w-full h-1/2 bg-[#FFD700] animate-[slideDown_2s_ease-in-out_infinite]" />
        </div>
      </div>

    </section>
  );
});
