import { component$ } from '@builder.io/qwik';

type Sponsor = {
  id: number;
  name: string;
  logoUrl: string;
  url: string | null;
  displayOrder: number;
};

interface SponsorsProps {
  sponsorsList: readonly Sponsor[];
}

export const Sponsors = component$<SponsorsProps>(({ sponsorsList }) => {
  if (!sponsorsList || sponsorsList.length === 0) return null;

  return (
    <section class="w-full relative z-20 bg-[#0a1128] border-t-4 border-b-4 border-yellow-400">
      <div class="container mx-auto px-4 max-w-7xl py-14">
        <div class="flex flex-wrap lg:flex-nowrap justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 overflow-hidden">
          {sponsorsList.map((sponsor) => {
            const innerContent = (
              <img 
                src={sponsor.logoUrl} 
                alt={sponsor.name} 
                title={sponsor.name}
                class="h-12 md:h-14 lg:h-16 w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 transition-all duration-300"
                loading="lazy" 
                decoding="async"
                width={160}
                height={64}
              />
            );

            return sponsor.url ? (
              <a 
                key={sponsor.id} 
                href={sponsor.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                class="group transition-transform hover:scale-105" 
                aria-label={`Sponsor ${sponsor.name}`}
              >
                {innerContent}
              </a>
            ) : (
              <div 
                key={sponsor.id} 
                class="group transition-transform hover:scale-105 cursor-default"
              >
                {innerContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
