import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import lprcLogo from '~/media/lprc.svg';
import { Button } from '~/components/ui/button/button';

export const Navbar = component$(() => {
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);

  useOnWindow(
    'scroll',
    $(() => {
      isScrolled.value = window.scrollY > 50;
    })
  );

  return (
    <nav
      class={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled.value
          ? 'bg-[#0a1128]/97 backdrop-blur-md shadow-[0_2px_0_0_rgba(255,215,0,0.15)] py-3'
          : 'bg-gradient-to-b from-black/50 to-transparent py-5'
      }`}
    >
      <div class="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a href="/" class="flex items-center gap-3">
          <img
            src={lprcLogo}
            alt="La Plata Rugby Club"
            width="80"
            height="80"
            class={`transition-all duration-300 ${isScrolled.value ? 'h-10 w-auto' : 'h-14 md:h-16 w-auto drop-shadow-lg'}`}
          />
          <div class="flex flex-col hidden sm:flex">
            <span
              class={`text-xl md:text-2xl font-black tracking-widest ${isScrolled.value ? 'text-yellow-400' : 'text-white'}`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              LPRC
            </span>
            <span
              class={`text-[0.55rem] font-bold uppercase tracking-[0.25em] -mt-0.5 ${isScrolled.value ? 'text-gray-300' : 'text-yellow-400'}`}
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Rugby Club
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center gap-8">
          {['/#institucional', '/#autoridades', '/#contacto'].map((href, i) => {
            const labels = ['Institucional', 'Autoridades', 'Contacto'];
            return (
              <a
                key={href}
                href={href}
                class="text-gray-300 hover:text-yellow-400 transition-colors uppercase tracking-widest text-xs font-semibold relative group"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {labels[i]}
                <span class="absolute -bottom-1 left-0 w-0 h-px bg-yellow-400 group-hover:w-full transition-all duration-300" />
              </a>
            );
          })}

          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 inline-block"
          >
            <Button
              look="primary"
              size="sm"
              class="rounded-none bg-yellow-400 text-[#0a1128] border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-400 font-black uppercase tracking-widest text-xs transition-all duration-200 px-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Hacete Socio
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          class="md:hidden text-white p-2 focus:outline-none"
          onClick$={() => (isMobileMenuOpen.value = !isMobileMenuOpen.value)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen.value ? (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        class={`md:hidden absolute top-full left-0 w-full bg-[#0a1128]/98 backdrop-blur-md shadow-2xl transition-all duration-300 origin-top overflow-hidden border-t border-yellow-400/20 ${
          isMobileMenuOpen.value ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <div class="flex flex-col p-6 gap-5">
          {['/#institucional', '/#autoridades', '/#contacto'].map((href, i) => {
            const labels = ['Institucional', 'Autoridades', 'Contacto'];
            return (
              <a
                key={href}
                href={href}
                class="text-lg text-gray-300 hover:text-yellow-400 transition-colors border-b border-gray-800 pb-3 uppercase tracking-widest font-semibold"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {labels[i]}
              </a>
            );
          })}

          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="block mt-2"
          >
            <Button
              look="primary"
              size="md"
              class="rounded-none w-full bg-yellow-400 text-[#0a1128] border-2 border-yellow-400 hover:bg-transparent hover:text-yellow-400 font-black uppercase tracking-widest text-sm transition-all duration-200"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Hacete Socio
            </Button>
          </a>
        </div>
      </div>
    </nav>
  );
});
