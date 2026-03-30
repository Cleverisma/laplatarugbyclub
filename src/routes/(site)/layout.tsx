import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { sponsors } from '~/db/schema';
import { asc } from 'drizzle-orm';
import { Navbar } from '~/components/layout/navbar';
import { Footer } from '~/components/layout/footer';
import { Sponsors } from '~/components/home/sponsors/sponsors';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';

export const useSponsorsData = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return await db.select().from(sponsors).orderBy(asc(sponsors.displayOrder), asc(sponsors.id));
});

export default component$(() => {
  const sponsorsSig = useSponsorsData();
  
  return (
    <>
      <Navbar />
      <div class="">
        <Slot />
      </div>
      <Sponsors sponsorsList={sponsorsSig.value} />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
});
