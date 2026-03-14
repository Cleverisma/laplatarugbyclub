import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { matches } from '~/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { Hero } from '~/components/home/hero/hero';
import { MatchCenter } from '~/components/home/match-center/match-center';
import { Button } from '~/components/ui/button/button';
import { LatestEvents } from '~/components/home/latest-events/latest-events';
import { SocialFeed } from '~/components/home/social-feed/social-feed';
import { PromoVideo } from '~/components/home/promo-video/promo-video';
import { Infantil } from '~/components/home/infantil/infantil';
import { Contact } from '~/components/home/contact/contact';

export const useMatchesLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);

  const [lastMatch] = await db
    .select()
    .from(matches)
    .where(eq(matches.status, 'played'))
    .orderBy(desc(matches.matchDate))
    .limit(1);

  const [nextMatch] = await db
    .select()
    .from(matches)
    .where(eq(matches.status, 'upcoming'))
    .orderBy(asc(matches.matchDate))
    .limit(1);

  return { lastMatch, nextMatch };
});

export default component$(() => {
  const matchesData = useMatchesLoader();

  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950">
      <Hero />
      <MatchCenter 
        lastMatch={matchesData.value.lastMatch} 
        nextMatch={matchesData.value.nextMatch} 
      />
      
      {/* Transition Banner to El Club */}
      <section class="w-full bg-white flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-16 md:py-24 px-4 z-10 relative">
        <h2 
          class="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a1128] uppercase tracking-tighter text-center md:text-left"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          MÁS DE 90 AÑOS <span class="break-words sm:break-normal"><br class="hidden md:block" /> DE HISTORIA</span>
        </h2>
        <a href="/el-club">
          <Button
            look="primary"
            size="lg"
            class="rounded-none bg-[#FFD700] text-[#0a1128] border-none hover:bg-[#0a1128] hover:text-[#FFD700] font-black uppercase tracking-widest text-xl md:text-2xl transition-all duration-300 px-10 py-6 md:px-14 md:py-8"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            CONOCÉ EL CLUB
          </Button>
        </a>
      </section>

      <LatestEvents />
      <PromoVideo />
      <SocialFeed />
      <Infantil />
      
      {/* Transition Banner to Autoridades */}
      <section 
        class="w-full bg-[#FFD700] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-16 px-4 z-10 relative"
      >
        <h2 
          class="text-4xl md:text-5xl font-black text-[#0a1128] uppercase tracking-tighter text-center md:text-left"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          NUESTRO EQUIPO <br class="hidden md:block" /> DE TRABAJO
        </h2>
        <a href="/autoridades">
          <Button
            look="primary"
            size="lg"
            class="rounded-none bg-[#0a1128] text-white border-2 border-[#0a1128] hover:bg-white hover:text-[#0a1128] font-black uppercase tracking-widest text-xl transition-all duration-300 px-10 py-6"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            VER AUTORIDADES
          </Button>
        </a>
      </section>

      <Contact />
    </main>
  );
});

export const head: DocumentHead = {
  title: 'La Plata Rugby Club | Sitio Oficial',
  meta: [
    {
      name: 'description',
      content: 'Sitio oficial de La Plata Rugby Club. Formar buenas personas que disfruten del rugby. Enterate de las últimas novedades, eventos institucionales y deportivos.',
    },
    {
      name: 'theme-color',
      content: '#000080',
    },
    {
      property: 'og:title',
      content: 'La Plata Rugby Club | Sitio Oficial'
    },
    {
      property: 'og:description',
      content: 'Sitio oficial de La Plata Rugby Club. Formar buenas personas que disfruten del rugby.'
    }
  ],
};
