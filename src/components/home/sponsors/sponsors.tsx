import { component$ } from '@builder.io/qwik';
import sponsorGatorade from '~/media/sponsors/Gatorade.png?url';
import sponsorFlash from '~/media/sponsors/flash.svg?url';
import sponsorMacro from '~/media/sponsors/macro.svg?url';
import sponsorPlusmar from '~/media/sponsors/plusmar.png?url';
import sponsorStella from '~/media/sponsors/stella.svg?url';
import sponsorAon from '~/media/sponsors/aon.svg?url';

export const Sponsors = component$(() => {
  return (
    <section class="w-full relative z-20 bg-[#0a1128] border-t-4 border-b-4 border-yellow-400">
      <div class="container mx-auto px-4 max-w-7xl py-14">
        <div class="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 overflow-hidden">
          <a href="https://www.macro.com.ar/" class="group" aria-label="Sponsor Banco Macro">
            <img src={sponsorMacro} alt="Banco Macro" width="160" height="64" class="h-10 md:h-12 lg:h-14 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="https://www.stellaartois.com/es_ar" class="group" aria-label="Sponsor Stella Artois">
            <img src={sponsorStella} alt="Stella Artois" width="160" height="64" class="h-16 md:h-20 lg:h-28 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="https://www.flash-sports.com.ar/" class="group" aria-label="Sponsor Flash">
            <img src={sponsorFlash} alt="Flash" width="160" height="64" class="h-12 md:h-14 lg:h-16 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="https://gatorade.lat/ar/" class="group" aria-label="Sponsor Gatorade">
            <img src={sponsorGatorade} alt="Gatorade" width="160" height="64" class="h-14 md:h-16 lg:h-20 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="https://www.plusmar.com.ar/" class="group" aria-label="Sponsor Plusmar">
            <img src={sponsorPlusmar} alt="Plusmar" width="160" height="64" class="h-7 md:h-9 lg:h-10 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="https://www.aon.com/" class="group" aria-label="Sponsor AON">
            <img src={sponsorAon} alt="AON" width="160" height="64" class="h-8 md:h-10 lg:h-11 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
});
