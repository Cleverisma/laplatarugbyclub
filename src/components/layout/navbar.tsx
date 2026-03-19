import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Button } from '~/components/ui/button/button';
import { NavLink } from '~/components/ui/nav-link';

export const Navbar = component$(() => {
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);
  const loc = useLocation();
  const isHome = loc.url.pathname === '/';

  useOnWindow(
    'scroll',
    $(() => {
      isScrolled.value = window.scrollY > 50;
    })
  );

  // On inner pages the navbar is always solid & compact (no scroll effect).
  const solid = !isHome || isScrolled.value;

  return (
    <nav
      class={`fixed top-0 w-full z-50 transition-all duration-500 border-b-0 ${solid
        ? 'bg-[#0a1128]/95 backdrop-blur-lg shadow-2xl py-6 md:py-8'
        : 'bg-gradient-to-b from-black/90 to-transparent py-10 md:py-16'
        }`}
    >
      <div class="container mx-auto px-10 xl:px-14 max-w-[1800px] relative flex items-center justify-center">

        {/* Mobile Menu Toggle (Visible up to LG) */}
        <button
          class="lg:hidden text-white p-5 focus:outline-none transition-transform hover:scale-110 active:scale-95"
          onClick$={() => (isMobileMenuOpen.value = !isMobileMenuOpen.value)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen.value ? (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation Menu (Visible from LG) */}
        <div class="hidden lg:flex items-center gap-[clamp(1.5rem,2vw,5rem)] w-full justify-center">
          {['/', '/el-club', '/staff', '/autoridades', '/eventos', '/#contacto'].map((href, i) => {
            const labels = ['INICIO', 'EL CLUB', 'STAFFS', 'COMISIÓN DIRECTIVA', 'AGENDA', 'CONTACTO'];
            return (
              <NavLink
                key={href}
                href={href}
                activeClass="!text-yellow-400 active-link-desktop"
                class="text-gray-100 hover:text-yellow-400 transition-colors uppercase tracking-[0.3em] xl:tracking-[0.4em] font-black relative group whitespace-nowrap"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 'clamp(14px, 1.1vw, 20px)'
                }}
              >
                {labels[i]}
                <span class="absolute -bottom-3 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full group-[.active-link-desktop]:w-full transition-all duration-300" />
              </NavLink>
            );
          })}

          {/* Socio Button in Desktop Nav */}
          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="ml-4 xl:ml-12 shrink-0"
          >
            <Button
              look="primary"
              size="lg"
              class="rounded-none bg-[#FFD700] text-[#0a1128] border-2 border-[#FFD700] hover:bg-transparent hover:text-[#FFD700] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(14px, 1vw, 18px)',
                padding: 'clamp(0.8rem, 1.2vw, 1.6rem) clamp(1.5rem, 2.5vw, 3.5rem)'
              }}
            >
              SUMATE
            </Button>
          </a>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        class={`md:hidden absolute top-full left-0 w-full bg-[#0a1128]/98 backdrop-blur-2xl shadow-2xl transition-all duration-500 origin-top overflow-hidden border-t border-yellow-400/10 ${isMobileMenuOpen.value ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div class="flex flex-col p-10 gap-8 items-center text-center">
          {['/', '/el-club', '/staff', '/autoridades', '/eventos', '/#contacto'].map((href, i) => {
            const labels = ['INICIO', 'EL CLUB', 'STAFFS', 'COMISIÓN DIRECTIVA', 'AGENDA', 'CONTACTO'];
            return (
              <NavLink
                key={href}
                href={href}
                activeClass="!text-yellow-400 active-link-mobile"
                class="text-4xl text-gray-200 hover:text-yellow-400 transition-colors uppercase tracking-widest font-black"
                style={{ fontFamily: "'Oswald', sans-serif" }}
                onClick$={() => (isMobileMenuOpen.value = false)}
              >
                {labels[i]}
              </NavLink>
            );
          })}

          <a
            href="https://api.whatsapp.com/send?phone=5492216796537&text=Hola%20vengo%20desde%20el%20sitio%20web%20de%20www.laplatarugbyclub.com.ar%20y%20estoy%20interesado%20en%20hacerme%20socio."
            target="_blank"
            rel="noopener noreferrer"
            class="w-full mt-6"
          >
            <Button
              look="primary"
              size="lg"
              class="rounded-none w-full bg-[#FFD700] text-[#0a1128] border-2 border-[#FFD700] hover:bg-transparent hover:text-[#FFD700] font-black uppercase tracking-widest text-xl transition-all duration-300 py-6"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              SUMATE
            </Button>
          </a>

          <p class="text-[10px] text-gray-500 tracking-[0.5em] font-bold mt-12 uppercase">
            La Plata Rugby Club
          </p>
        </div>
      </div>
    </nav>
  );
});
