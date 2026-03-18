import { component$ } from '@builder.io/qwik';
import sponsorGatorade from '~/media/sponsors/Gatorade.png?url';
import sponsorFlash from '~/media/sponsors/flash.svg?url';
import sponsorMacro from '~/media/sponsors/macro.svg?url';
import sponsorPlusmar from '~/media/sponsors/plusmar.png?url';
import sponsorStella from '~/media/sponsors/stella.svg?url';
import sponsorAon from '~/media/sponsors/aon.svg?url';
import bgImage from '~/media/8.jpeg';

export const Sponsors = component$(() => {
  return (
    <section
      class="w-full py-14 relative z-20 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 215, 0, 0.92), rgba(255, 215, 0, 0.95)), url(${bgImage})`,
      }}
    >
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-28">
          <a href="#" class="group" aria-label="Sponsor Banco Macro">
            <img src={sponsorMacro} alt="Banco Macro" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="#" class="group" aria-label="Sponsor Stella Artois">
            <img src={sponsorStella} alt="Stella Artois" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="#" class="group" aria-label="Sponsor Flash">
            <img src={sponsorFlash} alt="Flash" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="#" class="group" aria-label="Sponsor Gatorade">
            <img src={sponsorGatorade} alt="Gatorade" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="#" class="group" aria-label="Sponsor Plusmar">
            <img src={sponsorPlusmar} alt="Plusmar" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
          <a href="#" class="group" aria-label="Sponsor AON">
            <img src={sponsorAon} alt="AON" width="160" height="64" class="h-10 md:h-14 lg:h-16 w-auto object-contain filter brightness-0 opacity-60 group-hover:brightness-100 group-hover:opacity-100 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
});
