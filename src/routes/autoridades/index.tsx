import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BoardMembers } from '~/components/home/board-members/board-members';

export default component$(() => {
  return (
    <main class="flex flex-col min-h-screen selection:bg-yellow-400 selection:text-blue-950 pt-24 md:pt-32 bg-[#0a1128]">
      {/* Hero Header */}
      <section 
        class="relative w-full bg-[#0a1128] py-16 md:py-24 px-4 flex flex-col items-center justify-center z-10"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 4vw), 0 100%)',
          marginBottom: '-4vw'
        }}
      >
        <span class="text-yellow-400 font-bold uppercase tracking-[0.3em] text-sm md:text-base mb-4 block" style={{ fontFamily: "'Oswald', sans-serif" }}>
          Dirigencia LPRC
        </span>
        <h1 
          class="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter text-center leading-none"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          AUTORIDADES
        </h1>
        <div class="h-1 w-24 md:w-32 bg-yellow-400 mt-8 mb-6 mx-auto" />
      </section>

      {/* Since BoardMembers component brings its own title and styling, we render it directly */}
      <BoardMembers />

    </main>
  );
});

export const head: DocumentHead = {
  title: 'Autoridades | La Plata Rugby Club',
  meta: [
    {
      name: 'description',
      content: 'Conoce al equipo de trabajo y autoridades que lideran nuestro club con compromiso y dedicación bajo los valores de LPRC.',
    },
  ],
};
