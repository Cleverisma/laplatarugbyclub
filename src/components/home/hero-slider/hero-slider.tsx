import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

import img1 from '~/media/7.jpeg';
import img2 from '~/media/5.jpeg';
import img3 from '~/media/4.jpeg';

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
          to   { transform: scale(1.15); }
        }
        @keyframes heroZoomOut {
          from { transform: scale(1.15); }
          to   { transform: scale(1);   }
        }
        @keyframes heroPan {
          from { transform: scale(1.08) translateX(-4%); }
          to   { transform: scale(1.08) translateX(4%);  }
        }
        .hero-slide-zoom-in  { animation: heroZoomIn  6s ease-in-out forwards; }
        .hero-slide-zoom-out { animation: heroZoomOut 6s ease-in-out forwards; }
        .hero-slide-pan      { animation: heroPan     6s ease-in-out forwards; }
      `}</style>

      <section class="relative w-full overflow-hidden flex flex-col items-center justify-center"
        style={{ minHeight: '100svh' }}
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
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a1128]/90 via-black/60 to-transparent" />
            </div>
          );
        })}

        {/* ── Centred hero text ── */}
        <div class="relative z-10 flex flex-col items-center justify-center px-4 w-full h-[50vh] min-h-[300px]">
          {slides.map((slide, index) => {
            const isActive = currentSlide.value === index;
            return (
              <div
                key={`text-${index}`}
                class="absolute flex flex-col items-center transition-all duration-700 ease-out w-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? 'translateY(0)' : 'translateY(30px) scale(0.98)',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <h1
                  class="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-white leading-[0.9] tracking-tighter text-center max-w-5xl mx-auto drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {slide.text}
                </h1>
                <div class="w-24 md:w-32 h-2 md:h-3 bg-yellow-400 mx-auto mt-6 md:mt-8 shadow-[0_5px_15px_rgba(255,215,0,0.3)]"></div>
              </div>
            );
          })}
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
