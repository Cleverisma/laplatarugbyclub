import { component$, Slot } from '@builder.io/qwik';
import { Navbar } from '~/components/layout/navbar';
import { Footer } from '~/components/layout/footer';
import { WhatsAppButton } from '~/components/ui/whatsapp-button';
import { ScrollToTop } from '~/components/ui/scroll-to-top';
export default component$(() => {
  return (
    <>
      <Navbar />
      <Slot />
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  );
});
