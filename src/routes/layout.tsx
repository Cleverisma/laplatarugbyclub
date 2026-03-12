import { component$, Slot } from '@builder.io/qwik';
import { Navbar } from '~/components/layout/navbar';
import { Footer } from '~/components/layout/footer';

export default component$(() => {
  return (
    <>
      <Navbar />
      <Slot />
      <Footer />
    </>
  );
});
