import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import img1Url from '~/media/7.avif?url';
import img2Url from '~/media/5.avif?url';
import img3Url from '~/media/4.avif?url';
import lprcLogoUrl from '~/media/lprc.avif?url';

// Each slide has a dedicated CSS animation class so images always fill the frame (object-cover)
// while still having visible motion (zoom-in / zoom-out / pan).
const SLIDE_ANIMATIONS = [
  'hero-slide-zoom-in',
  'hero-slide-zoom-out',
  'hero-slide-pan',
];

const slides = [
  { imageUrl: img1Url, text: 'RUGBY, VALORES Y AMISTAD DESDE 1934' },
  { imageUrl: img2Url, text: 'FORMAMOS JUGADORES. CONSTRUIMOS PERSONAS' },
  { imageUrl: img3Url, text: 'DONDE EL RUGBY SE VIVE Y SE APRENDE' },
];

export const HeroSlider = component$(() => {
  const currentSlide = useSignal(0);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // Defer the interval start by 2s so LCP/FCP paint completes
    // before the JS thread gets occupied by the slide timer.
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        currentSlide.value = (currentSlide.value + 1) % slides.length;
      }, 6000);
    }, 2000);
    cleanup(() => {
      clearTimeout(timeout);
      clearInterval(interval);
    });
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

      <section class="relative w-full overflow-hidden flex flex-col items-center justify-center aspect-[3/4] min-h-[75svh] md:min-h-[85vh] lg:min-h-[95vh] md:aspect-auto">
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
                src={slide.imageUrl}
                alt=""
                width="1920"
                height="1080"
                class={`absolute inset-0 w-full h-full object-cover object-center ${isActive ? SLIDE_ANIMATIONS[index] : ''}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding={index === 0 ? 'sync' : 'async'}
                fetchPriority={index === 0 ? 'high' : 'low'}
              />
              {/* Dark overlay for text legibility */}
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a1128]/70 via-black/30 to-black/5" />
            </div>
          );
        })}

        {/* ── Centered hero content ── */}
        <div class="relative z-10 flex flex-col items-center justify-center px-4 w-full h-full min-h-[75svh] md:min-h-full lg:min-h-full pt-28 md:pt-32 lg:pt-40">

          {/* Logo Header (Fixed Position) */}
          <div class="flex flex-col items-center mb-10 md:mb-16 lg:mb-20 animate-[fadeIn_1.2s_ease-out] w-full shrink-0">
            <a href="/" class="block transition-transform hover:scale-105 active:scale-95">
              <img
                src={lprcLogoUrl}
                alt="La Plata Rugby Club"
                width="320"
                height="320"
                class="h-44 md:h-64 lg:h-80 w-auto transition-all duration-700 hover:scale-110"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </a>
          </div>

          {/* Slides Container (Relative wrapper for absolute text items) */}
          <div class="relative w-full h-[50vh] md:h-[30vh] lg:h-[25vh] min-h-[250px] flex items-start justify-center overflow-visible md:-translate-y-4">
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
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {slides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick$={() => { currentSlide.value = index; }}
              class="w-10 h-10 flex items-center justify-center p-2 cursor-pointer group transition-all duration-300"
              aria-label={`Ir al slide ${index + 1}`}
            >
              <span
                class={`h-2 rounded-full transition-all duration-300 ${currentSlide.value === index ? 'bg-yellow-400 w-6' : 'bg-white/50 w-2'
                  }`}
              />
            </button>
          ))}
        </div>
      </section>
    </>
  );
});
