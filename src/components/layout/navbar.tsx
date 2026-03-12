import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';

export const Navbar = component$(() => {
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);

  useOnWindow(
    'scroll',
    $((event) => {
      isScrolled.value = window.scrollY > 50;
    })
  );

  return (
    <nav 
      class={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled.value ? 'bg-blue-950/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div class="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <a href="/" class="flex flex-col items-center">
          <span class={`text-3xl font-black tracking-tighter ${isScrolled.value ? 'text-yellow-400' : 'text-white'}`}>
            LPRC
          </span>
          <span class={`text-[0.6rem] font-bold uppercase tracking-[0.2em] -mt-1 ${isScrolled.value ? 'text-white' : 'text-yellow-400'}`}>
            Rugby Club
          </span>
        </a>

        {/* Desktop Navigation */}
        <div class="hidden md:flex items-center gap-8">
          <a href="/institucional" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Institucional</a>
          <a href="/rugby" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Rugby</a>
          <a href="/hockey" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Hockey</a>
          <a href="/contacto" class="text-white font-semibold hover:text-yellow-400 transition-colors uppercase tracking-wider text-sm">Contacto</a>
          
          <button class="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-black py-2.5 px-6 rounded-full text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 ml-2 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            Hacete Socio
          </button>
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
        class={`md:hidden absolute top-full left-0 w-full bg-blue-950/95 backdrop-blur-md shadow-2xl transition-all duration-300 origin-top overflow-hidden ${
          isMobileMenuOpen.value ? 'max-h-[400px] border-t border-blue-900/50' : 'max-h-0'
        }`}
      >
        <div class="flex flex-col p-6 gap-6">
          <a href="/institucional" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Institucional</a>
          <a href="/rugby" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Rugby</a>
          <a href="/hockey" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Hockey</a>
          <a href="/contacto" class="text-xl text-white font-semibold hover:text-yellow-400 transition-colors border-b border-blue-900/50 pb-2">Contacto</a>
          
          <button class="bg-yellow-400 text-blue-950 font-black py-4 px-6 rounded-full text-lg uppercase tracking-wider mt-2 shadow-lg">
            Hacete Socio
          </button>
        </div>
      </div>
    </nav>
  );
});
