import { component$, useSignal } from '@builder.io/qwik';

export const FuarBanner = component$(() => {
  const isVisible = useSignal(true);

  if (!isVisible.value) return null;

  return (
    <div class="fixed bottom-24 right-4 md:bottom-28 md:right-6 lg:bottom-32 lg:right-8 z-[90] w-[300px] md:w-[340px] animate-[fadeInUp_0.5s_ease-out] drop-shadow-2xl">
      <div class="relative bg-white rounded-xl shadow-2xl overflow-visible border-4 border-white transition-transform hover:scale-[1.02] duration-300">

        {/* Close Button overlapping the border top-right */}
        <button
          onClick$={() => { isVisible.value = false; }}
          class="absolute -top-3 -right-3 w-8 h-8 bg-[#FFD700] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg hover:bg-yellow-500 transition-colors z-10 border-2 border-white"
          aria-label="Cerrar banner FUAR"
        >
          X
        </button>

        <a
          href="https://donaronline.org/fundacion-union-argentina-de-rugby/fuar-somos-todos"
          target="_blank"
          rel="noopener noreferrer"
          class="flex flex-col w-full h-full rounded-lg overflow-hidden group"
        >
          {/* Top Blue section */}
          <div class="bg-[#5C9CD7] p-4 text-white flex flex-col items-center text-center pb-6">
            <div class="flex items-center justify-center gap-3 w-full my-2">
              <span class="text-4xl md:text-5xl font-black italic tracking-tighter drop-shadow-md">
                FUAR
              </span>
              <div class="flex flex-col items-start border-l border-white/30 pl-3">
                <span class="text-[10px] uppercase font-bold tracking-widest leading-none">Fundación</span>
                <div class="relative mt-1">
                  <span class="text-xs md:text-sm font-black tracking-widest bg-white/10 px-2 py-0.5 rounded-full border border-white/50">
                    UAR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Dark Section */}
          <div class="bg-[#0a1128] py-4 md:py-5 flex items-center justify-center transition-colors group-hover:bg-[#111c40]">
            <span class="text-[#FFD700] font-black tracking-widest text-sm md:text-base uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Hacé click y doná ahora
            </span>
          </div>
        </a>
      </div>
    </div>
  );
});
