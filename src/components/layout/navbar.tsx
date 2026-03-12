import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import lprcLogo from '~/media/lprc.svg';

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
      class={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled.value ? 'bg-blue-950/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
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
            class={`transition-all duration-300 ${isScrolled.value ? 'h-12 w-auto' : 'h-16 md:h-20 w-auto drop-shadow-lg'}`}
          />
          <div class="flex flex-col hidden sm:flex">
            <span class={`text-2xl md:text-3xl font-black tracking-tighter ${isScrolled.value ? 'text-yellow-400' : 'text-white'}`}>
              LPRC
            </span>
            <span class={`text-[0.6rem] font-bold uppercase tracking-[0.2em] -mt-1 ${isScrolled.value ? 'text-white' : 'text-yellow-400'}`}>
              Rugby Club
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center gap-8">
          <a href="/#institucional" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Institucional</a>
          <a href="/#autoridades" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Autoridades</a>
          <a href="/#contacto" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Contacto</a>

          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black py-2.5 px-6 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ml-2 shadow-[0_0_15px_rgba(250,204,21,0.3)] text-center block md:inline-block"
          >
            Hacete Socio
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          class="md:hidden text-white p-2 focus:outline-none"
          onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen.value ? (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        class={`md:hidden absolute top-full left-0 w-full bg-blue-950/95 backdrop-blur-md shadow-2xl transition-all duration-300 origin-top overflow-hidden ${isMobileMenuOpen.value ? 'max-h-[400px] border-t border-blue-900/50' : 'max-h-0'
          }`}
      >
        <div class="flex flex-col p-6 gap-6">
          <a href="/#institucional" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Institucional</a>
          <a href="/#autoridades" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Autoridades</a>
          <a href="/#contacto" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Contacto</a>

          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="bg-yellow-400 text-blue-950 font-black py-4 px-6 rounded-full text-lg uppercase tracking-wider mt-2 shadow-lg text-center block"
          >
            Hacete Socio
          </a>
        </div>
      </div>
    </nav>
  );
});
