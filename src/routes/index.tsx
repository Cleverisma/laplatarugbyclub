import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Hero } from '~/components/home/hero/hero';
import { Institutional } from '~/components/home/institutional/institutional';
import { LatestEvents } from '~/components/home/latest-events/latest-events';
import { SocialFeed } from '~/components/home/social-feed/social-feed';
import { History } from '~/components/home/history/history';
import { BoardMembers } from '~/components/home/board-members/board-members';
import { Contact } from '~/components/home/contact/contact';

export default component$(() => {
  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950">
      <Hero />
      <Institutional />
      <LatestEvents />
      <History />
      <SocialFeed />
      <BoardMembers />
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
