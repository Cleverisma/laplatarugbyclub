import { component$ } from '@builder.io/qwik';

export const Hero = component$(() => {
  return (
    <section
      class="relative h-[100svh] min-h-[600px] w-full overflow-hidden flex items-center justify-center"
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

    </section>
  );
});
