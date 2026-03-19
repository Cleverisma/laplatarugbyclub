import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import img1 from '~/media/7.jpeg';
import img2 from '~/media/5.jpeg';
import img3 from '~/media/4.jpeg';
import lprcLogo from '~/media/lprc.svg';

// Each slide has a dedicated CSS animation class so images always fill the frame (object-cover)
// while still having visible motion (zoom-in / zoom-out / pan).
const SLIDE_ANIMATIONS = [
  'hero-slide-zoom-in',
  'hero-slide-zoom-out',
  'hero-slide-pan',
];

const slides = [
  { image: img1, text: 'RUGBY, VALORES Y AMISTAD DESDE 1934' },
  { image: img2, text: 'FORMAMOS JUGADORES. CONSTRUIMOS PERSONAS' },
  { image: img3, text: 'DONDE EL RUGBY SE VIVE Y SE APRENDE' },
];

export const HeroSlider = component$(() => {
  const currentSlide = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const interval = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.length;
    }, 6000);
    cleanup(() => clearInterval(interval));
  });

  return (
    <>
      {/* Keyframe CSS injected inline so no external stylesheet is needed */}
      <style>{`
        @keyframes heroZoomIn {
          from { transform: scale(1);   }
          to   { transform: scale(1.05); }
        }
        @keyframes heroZoomOut {
          from { transform: scale(1.05); }
          to   { transform: scale(1);   }
        }
        @keyframes heroPan {
          from { transform: scale(1.02) translateX(-1%); }
          to   { transform: scale(1.02) translateX(1%);  }
        }
        .hero-slide-zoom-in  { animation: heroZoomIn  6s ease-in-out forwards; }
        .hero-slide-zoom-out { animation: heroZoomOut 6s ease-in-out forwards; }
        .hero-slide-pan      { animation: heroPan     6s ease-in-out forwards; }
      `}</style>

      <section class="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          minHeight: '100svh',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw'
        }}
      >
        {/* ── Background Slides ── */}
        {slides.map((slide, index) => {
          const isActive = currentSlide.value === index;
          return (
            <div
              key={`slide-${index}`}
              class="absolute inset-0 overflow-hidden"
              style={{
                opacity: isActive ? 1 : 0,
                transition: 'opacity 1.2s ease-in-out',
                zIndex: isActive ? 1 : 0,
              }}
            >
              <img
                src={slide.image}
                alt=""
                width={1920}
                height={1080}
                class={`absolute inset-0 w-full h-full object-cover ${isActive ? SLIDE_ANIMATIONS[index] : ''}`}
              />
              {/* Dark overlay for text legibility */}
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a1128]/70 via-black/30 to-black/5" />
            </div>
          );
        })}

        {/* ── Centered hero content ── */}
        <div class="relative z-10 flex flex-col items-center justify-center px-4 w-full h-full min-h-screen pt-16 md:pt-24 lg:pt-32">
          
          {/* Logo Header (Fixed Position) */}
          <div class="flex flex-col items-center mb-12 md:mb-20 lg:mb-24 animate-[fadeIn_1.2s_ease-out] w-full shrink-0">
            <a href="/" class="block transition-transform hover:scale-105 active:scale-95">
              <img 
                src={lprcLogo} 
                alt="La Plata Rugby Club" 
                width="320" 
                height="320" 
                class="h-44 md:h-64 lg:h-80 w-auto transition-all duration-700 hover:scale-110"
              />
            </a>
          </div>

          {/* Slides Container (Relative wrapper for absolute text items) */}
          <div class="relative w-full h-[50vh] md:h-[40vh] min-h-[300px] flex items-start justify-center overflow-visible">
            {slides.map((slide, index) => {
              const isActive = currentSlide.value === index;
              return (
                <div
                  key={`text-${index}`}
                  class="absolute flex flex-col items-center transition-all duration-1000 ease-out w-full"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0) scale(1.05)' : 'translateY(40px) scale(0.95)',
                    pointerEvents: isActive ? 'auto' : 'none',
                    transitionDelay: isActive ? '200ms' : '0ms'
                  }}
                >
                  <h1
                    class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.9] tracking-tighter text-center max-w-6xl mx-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] px-2"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {slide.text}
                  </h1>
                  <div class="w-20 md:w-32 h-1.5 md:h-3 bg-yellow-400 mx-auto mt-6 md:mt-12 shadow-[0_5px_20px_rgba(255,215,0,0.4)] transition-all duration-500 rounded-full"></div>
                </div>
              );
            })}
          </div>
        </div>


        {/* ── Slide indicator dots ── */}
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick$={() => { currentSlide.value = index; }}
              class={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide.value === index ? 'bg-yellow-400 w-6' : 'bg-white/50'
                }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
});
