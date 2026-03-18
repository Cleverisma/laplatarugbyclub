import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { LiteYouTube } from '~/components/ui/lite-youtube';

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
  { image: img1 },
  { image: img2 },
  { image: img3 },
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
        style={{ minHeight: '110svh', paddingTop: '12rem', paddingBottom: '9rem' }}
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
              {/* Dark gradient overlay – heavier at top for navbar legibility */}
              <div class="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, rgba(10,17,40,0.6) 0%, rgba(10,17,40,0.35) 50%, rgba(10,17,40,0.7) 100%)' }}
              />
            </div>
          );
        })}

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

        {/* ── Video ── */}
        <div class="relative z-10 w-full max-w-4xl mx-auto px-4">
          <div class="shadow-[0_20px_60px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border border-white/10 bg-[#0a1128] transition-transform duration-500 hover:scale-[1.01]">
            <LiteYouTube videoId="CG0Tm0oQ5Tg" title="Video Institucional La Plata Rugby Club" />
          </div>
        </div>
      </section>
    </>
  );
});
