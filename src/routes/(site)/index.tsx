import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { matches } from '~/db/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { HeroSlider } from '~/components/home/hero-slider/hero-slider';
import { MatchCenter } from '~/components/home/match-center/match-center';
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

export const useInstagramFeed = routeLoader$(async () => {
  try {
    const res = await fetch('https://v2.behold.so/TU_ID_DE_BEHOLD', {
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
        media_url?: string;
        permalink?: string;
        caption?: string;
      }>;
    };

    const mappedPosts: Array<InstagramPostProps | null> =
      data.posts?.map((item): InstagramPostProps | null => {
        if (!item.id || !item.media_url || !item.permalink) return null;

        return {
          id: item.id,
          imageUrl: item.media_url,
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

      <LatestEvents events={eventsData.value} />

      {/* Transition Banner to El Club */}
      <section
        class="w-full relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-24 md:py-32 px-4 z-10 overflow-hidden"
        style={{
          backgroundImage: `url(${juego1Img})`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div class="absolute inset-0 bg-[#0a1128]/80 z-0"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full">
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter text-center md:text-left drop-shadow-lg"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            MÁS DE 90 AÑOS <span class="break-words sm:break-normal text-[#FFD700]"><br class="hidden md:block" /> DE HISTORIA</span>
          </h2>
          <a href="/el-club">
            <Button
              look="primary"
              size="lg"
              class="rounded-none bg-[#FFD700] text-[#0a1128] border-none hover:bg-white hover:text-[#0a1128] font-black uppercase tracking-widest text-xl md:text-2xl transition-all duration-300 px-10 py-6 md:px-14 md:py-8 shadow-xl"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              CONOCÉ EL CLUB
            </Button>
          </a>
        </div>
      </section>

      <SocialFeed posts={instagramFeed.value} />

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
