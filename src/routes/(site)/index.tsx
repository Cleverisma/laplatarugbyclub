import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { matches } from '~/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { HeroSlider } from '~/components/home/hero-slider/hero-slider';
import { MatchCenter } from '~/components/home/match-center/match-center';
import { StatsCounter } from '~/components/home/stats-counter/stats-counter';
import { Button } from '~/components/ui/button/button';
import { LatestEvents } from '~/components/home/latest-events/latest-events';
import {
  SocialFeed,
  MOCK_INSTAGRAM_POSTS,
  type InstagramPostProps,
} from '~/components/home/social-feed/social-feed';
import juego1Img from '~/media/juego-1.jpeg';
import { Contact } from '~/components/home/contact/contact';
import { getEvents } from '~/data/events-data';
import { VerticalVideo } from '~/components/home/vertical-video/vertical-video';
import { PromoVideo } from '~/components/home/promo-video/promo-video';
import { FuarBanner } from '~/components/home/fuar-banner/fuar-banner';
export const useMatchesLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);

  const lastMatch = await db.query.matches.findFirst({
    where: eq(matches.status, 'played'),
    orderBy: [desc(matches.matchDate)],
  });

  const nextMatch = await db.query.matches.findFirst({
    where: eq(matches.status, 'upcoming'),
    orderBy: [asc(matches.matchDate)],
  });

  return { lastMatch, nextMatch };
});

export const useInstagramFeed = routeLoader$(async () => {
  try {
    const res = await fetch('https://feeds.behold.so/DPNOhrNZKVOOvpy5y2OS', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      return MOCK_INSTAGRAM_POSTS;
    }

    const data = (await res.json()) as {
      posts?: Array<{
        id: string;
        mediaUrl?: string;
        permalink?: string;
        caption?: string;
        mediaType?: string;
        thumbnailUrl?: string;
      }>;
    };

    const mappedPosts: Array<InstagramPostProps | null> =
      data.posts?.map((item): InstagramPostProps | null => {
        if (!item.id || !item.permalink) return null;

        const imageUrl =
          item.mediaType === 'VIDEO' && item.thumbnailUrl
            ? item.thumbnailUrl
            : item.mediaUrl;

        if (!imageUrl) return null;

        return {
          id: item.id,
          imageUrl,
          link: item.permalink,
          caption: item.caption,
        };
      }) ?? [];

    const posts = mappedPosts.filter(
      (p): p is InstagramPostProps => p !== null,
    );

    if (!posts.length) {
      return MOCK_INSTAGRAM_POSTS;
    }

    return posts;
  } catch {
    return MOCK_INSTAGRAM_POSTS;
  }
});

export const useEventsLoader = routeLoader$(async (requestEvent) => {
  return getEvents(requestEvent.env);
});

export default component$(() => {
  const matchesData = useMatchesLoader();
  const instagramFeed = useInstagramFeed();
  const eventsData = useEventsLoader();

  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950">
      <HeroSlider />
      <MatchCenter
        lastMatch={matchesData.value.lastMatch}
        nextMatch={matchesData.value.nextMatch}
      />

      <PromoVideo />

      <StatsCounter />

      <LatestEvents events={eventsData.value} />

      {/* Palmarés / Trophies Banner */}
      <section
        class="w-full relative py-20 md:py-28 pb-[calc(5rem+4vw)] px-4 z-10 overflow-hidden"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw',
          backgroundImage: `url(${juego1Img})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div class="absolute inset-0 bg-[#0a1128]/95 z-0"></div>
        
        <div class="relative z-10 container mx-auto mb-16 mt-4 flex justify-center">
            <h2
            class="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter text-center border-b-2 border-yellow-400 pb-4"
            style={{ fontFamily: "'Oswald', sans-serif" }}
            >
            CUMPLIMOS 92 ANOS <span class="text-[#FFD700]">EL PRIMER CLUB DE RUGBY DE LA CIUDAD</span>
            </h2>
        </div>

        <div class="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 w-full">
          {/* 1995 */}
          <div class="flex flex-col items-center group cursor-default">
            <div class="w-28 h-28 md:w-36 md:h-36 border border-white/20 flex items-center justify-center mb-6 bg-[#0a1128]/50 backdrop-blur-sm transition-all group-hover:bg-[#FFD700] group-hover:border-[#FFD700] group-hover:scale-110 group-hover:-translate-y-2 duration-300">
              {/* Trophy cup SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 md:w-16 md:h-16 text-white group-hover:text-[#0a1128] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.27.988v2.534" />
              </svg>
            </div>
            <span class="text-4xl md:text-5xl font-black text-white mb-2 tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>1995</span>
            <span class="text-xs md:text-sm text-gray-300 uppercase tracking-widest font-bold text-center" style={{ fontFamily: "'Inter', sans-serif" }}>CAMPEÓN<br/>DE LA UAR</span>
          </div>

          {/* 1998 */}
          <div class="flex flex-col items-center group cursor-default">
            <div class="w-28 h-28 md:w-36 md:h-36 border border-white/20 flex items-center justify-center mb-6 bg-[#0a1128]/50 backdrop-blur-sm transition-all group-hover:bg-[#FFD700] group-hover:border-[#FFD700] group-hover:scale-110 group-hover:-translate-y-2 duration-300">
              {/* Trophy cup SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 md:w-20 md:h-20 text-white group-hover:text-[#0a1128] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.27.988v2.534" />
              </svg>
            </div>
            <span class="text-4xl md:text-5xl font-black text-white mb-2 tracking-wide group-hover:text-[#FFD700] transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>1998</span>
            <span class="text-xs md:text-sm text-gray-300 uppercase tracking-widest font-bold text-center" style={{ fontFamily: "'Inter', sans-serif" }}>COPA FEDERAL<br/>DE CLUBES</span>
          </div>

          {/* 2007 */}
          <div class="flex flex-col items-center group cursor-default">
            <div class="w-28 h-28 md:w-36 md:h-36 border border-white/20 flex items-center justify-center mb-6 bg-[#0a1128]/50 backdrop-blur-sm transition-all group-hover:bg-[#FFD700] group-hover:border-[#FFD700] group-hover:scale-110 group-hover:-translate-y-2 duration-300">
              {/* Trophy cup SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 md:w-16 md:h-16 text-white group-hover:text-[#0a1128] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-2.27.988v2.534" />
              </svg>
            </div>
            <span class="text-4xl md:text-5xl font-black text-white mb-2 tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>2007</span>
            <span class="text-xs md:text-sm text-gray-300 uppercase tracking-widest font-bold text-center" style={{ fontFamily: "'Inter', sans-serif" }}>NACIONAL<br/>DE CLUBES</span>
          </div>

        </div>
      </section>

      <SocialFeed posts={instagramFeed.value} />

      {/* Transition Banner to Autoridades */}
      <section
        class="w-full bg-[#FFD700] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-16 pb-[calc(4rem+4vw)] px-4 z-10 relative"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw'
        }}
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
            VER COMISIÓN DIRECTIVA 2026
          </Button>
        </a>
      </section>

      <VerticalVideo />

      <Contact />
      <FuarBanner />
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
