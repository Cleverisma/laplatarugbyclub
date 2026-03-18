import { component$, Slot } from '@builder.io/qwik';
import { Navbar } from '~/components/layout/navbar';
import { Footer } from '~/components/layout/footer';
import { Sponsors } from '~/components/home/sponsors/sponsors';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="">
        <Slot />
      </div>
      <Sponsors />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
});
