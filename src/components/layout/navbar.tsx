import { component$, useSignal, useOnWindow, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Button } from '~/components/ui/button/button';
import { NavLink } from '~/components/ui/nav-link';
import { FacebookIcon, InstagramIcon, XIcon } from '~/components/home/stats-counter/stats-counter';
import lprcLogo from '~/media/lprc.avif';

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
      <div class="container mx-auto px-6 xl:px-14 max-w-[1800px] relative flex items-center justify-between lg:justify-center min-h-[56px] md:min-h-[64px]">

        {/* LOGO (Left) */}
        <div
          class={`transition-all duration-500 lg:absolute lg:left-14 z-10 ${(!isHome || isScrolled.value) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
        >
          <a href="/" class="block hover:scale-105 transition-transform">
            <img src={lprcLogo} alt="La Plata Rugby Club" class="h-14 md:h-16 lg:h-20 w-auto" width="80" height="80" />
          </a>
        </div>

        {/* Desktop Navigation Menu (Visible from LG) */}
        <div class="hidden lg:flex items-center lg:gap-4 xl:gap-[clamp(1rem,1.2vw,3rem)] 2xl:gap-[clamp(1.5rem,2vw,5rem)] w-full lg:justify-end xl:justify-center">
          {['/el-club', '/staff', '/autoridades', '/eventos', '/#contacto'].map((href, i) => {
            const labels = ['EL CLUB', 'STAFFS', 'COMISIÓN DIRECTIVA', 'AGENDA', 'CONTACTO'];
            return (
              <NavLink
                key={href}
                href={href}
                activeClass="!text-yellow-400 active-link-desktop"
                class="text-gray-100 hover:text-yellow-400 transition-colors uppercase tracking-[0.15em] xl:tracking-[0.2em] 2xl:tracking-[0.4em] font-black relative group whitespace-nowrap"
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
            class="lg:ml-2 xl:ml-6 2xl:ml-12 shrink-0"
          >
            <Button
              look="primary"
              size="lg"
              class="rounded-none bg-[#FFD700] text-[#0a1128] border-2 border-[#FFD700] hover:bg-transparent hover:text-[#FFD700] font-black uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] scale-105"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 'clamp(16px, 1.2vw, 22px)',
                padding: 'clamp(1rem, 1.4vw, 1.8rem) clamp(2rem, 3vw, 4rem)'
              }}
            >
              HACETE SOCIO
            </Button>
          </a>
          <div class="flex items-center gap-3 2xl:gap-4 ml-4 xl:ml-4 2xl:ml-8 border-l border-white/20 pl-4 xl:pl-4 2xl:pl-8 text-white">
            <a href="https://www.instagram.com/laplatarugby/" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors hover:scale-110" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/LaPlataRugbyClub" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors hover:scale-110" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/laplatarugby" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors hover:scale-110" aria-label="X (Twitter)">
              <XIcon />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle (Visible up to LG) */}
        <button
          class="lg:hidden text-white p-2 focus:outline-none transition-transform hover:scale-110 active:scale-95 z-10"
          onClick$={() => (isMobileMenuOpen.value = !isMobileMenuOpen.value)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen.value ? (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div
        class={`md:hidden absolute top-full left-0 w-full bg-[#0a1128]/98 backdrop-blur-2xl shadow-2xl transition-all duration-500 origin-top overflow-y-auto border-t border-yellow-400/10 ${isMobileMenuOpen.value ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div class="flex flex-col p-6 pt-4 pb-8 gap-5 items-center text-center">
          {['/el-club', '/staff', '/autoridades', '/eventos', '/#contacto'].map((href, i) => {
            const labels = ['EL CLUB', 'STAFFS', 'COMISIÓN DIRECTIVA', 'AGENDA', 'CONTACTO'];
            return (
              <NavLink
                key={href}
                href={href}
                activeClass="!text-yellow-400 active-link-mobile"
                class="text-2xl sm:text-3xl text-gray-200 hover:text-yellow-400 transition-colors uppercase tracking-widest font-black"
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
              HACETE SOCIO
            </Button>
          </a>

          <div class="flex items-center justify-center gap-6 mt-6 text-white w-full border-t border-white/10 pt-8">
            <a href="https://www.instagram.com/laplatarugby/" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/LaPlataRugbyClub" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://twitter.com/laplatarugby" target="_blank" rel="noopener noreferrer" class="hover:text-yellow-400 transition-colors" aria-label="X (Twitter)">
              <XIcon />
            </a>
          </div>

          <p class="text-[10px] text-gray-500 tracking-[0.5em] font-bold mt-4 uppercase">
            La Plata Rugby Club
          </p>
        </div>
      </div>
    </nav>
  );
});
