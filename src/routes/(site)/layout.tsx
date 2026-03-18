import { component$, Slot } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Navbar } from '~/components/layout/navbar';
import { Footer } from '~/components/layout/footer';
import { Sponsors } from '~/components/home/sponsors/sponsors';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';

export default component$(() => {
  const loc = useLocation();
  const isHome = loc.url.pathname === '/';

  return (
    <>
      <Navbar />
      <div class={isHome ? '' : 'pt-44'}>
        <Slot />
      </div>
      <Sponsors />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
});
