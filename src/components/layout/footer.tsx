import { component$ } from '@builder.io/qwik';
import lprcLogo from '~/media/lprc.svg';

export const Footer = component$(() => {
  return (
    <footer class="text-white pt-16 pb-10 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a1128 0%, #000000 100%)' }}>
      {/* Decorative Accent */}
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500"></div>
      <div class="absolute -top-64 -right-64 w-[500px] h-[500px] bg-blue-900/50 rounded-full blur-3xl pointer-events-none"></div>

      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div class="flex flex-col space-y-6">
            <div class="flex items-center justify-between mb-2">
              <a href="/" class="shrink-0">
                <img src={lprcLogo} alt="La Plata Rugby Club Logo" width="80" height="80" class="h-16 md:h-20 w-auto drop-shadow-lg" />
              </a>
              <div class="flex items-center gap-2 md:gap-4 pl-4 md:pl-6 border-l border-white/10">
                {[1995, 1998, 2007].map((year) => (
                  <div key={`cup-${year}`} class="flex flex-col items-center group cursor-default" title={`Campeón Nacional ${year}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)] group-hover:scale-110 group-hover:text-yellow-300 transition-all duration-300 opacity-90 group-hover:opacity-100" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 27.395 27.395 0 002.053.244v3.24a4 4 0 00-2.048 3.102 4 4 0 00-1.123 1.166H5v1.5a.75.75 0 00.75.75h12.5a.75.75 0 00.75-.75v-1.5h-1.631a4 4 0 00-1.123-1.166 4 4 0 00-2.048-3.102v-3.24c.71-.05 1.403-.122 2.053-.244a6.753 6.753 0 006.138-5.6.75.75 0 00-.584-.86 48.016 48.016 0 00-3.071-.542v-.858a.75.75 0 00-.75-.75H5.916a.75.75 0 00-.75.75z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-[10px] md:text-xs font-black text-white/60 group-hover:text-yellow-400 mt-1 drop-shadow-md transition-colors duration-300 tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <p class="text-blue-200 leading-relaxed text-lg max-w-sm">
              Formar buenas personas que disfruten del rugby. Un club basado en valores, deporte y amistad desde 1934.
            </p>
            <address class="not-italic flex items-start gap-4 mt-6 text-blue-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="font-medium text-base">Camino Parque Centenario entre 495 y 496, Gonnet</span>
            </address>
          </div>

          {/* Enlaces Rápidos */}
          <div class="md:pl-10">
            <h3 class="text-xl font-bold mb-8 text-white uppercase tracking-widest border-b border-gray-800 pb-4 inline-block" style={{ fontFamily: "'Oswald', sans-serif" }}>Enlaces Rápidos</h3>
            <ul class="space-y-4">
              {['/el-club', '/historia', '/staff', '/autoridades', '/eventos', '/#contacto'].map((href, i) => {
                const labels = ['El Club', 'Historia', 'Staff de entrenadores', 'Comisión Directiva 2026', 'Agenda', 'Contacto'];
                return (
                  <li key={labels[i]}>
                    <a href={href} class="text-blue-200 hover:text-yellow-400 hover:pl-2 transition-all duration-300 flex items-center gap-2 group text-lg font-medium">
                      <span class="text-blue-700 font-black group-hover:text-yellow-400 transition-colors">&rsaquo;</span> {labels[i]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Redes Sociales y Contactos */}
          <div>
            <h3 class="text-xl font-bold mb-8 text-white uppercase tracking-widest border-b border-gray-800 pb-4 inline-block" style={{ fontFamily: "'Oswald', sans-serif" }}>Conectate</h3>
            <div class="space-y-6">
              <a href="https://wa.me/5492216796537" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-4 text-gray-400 hover:text-green-400 transition-colors bg-black/40 p-4 border border-gray-800 hover:border-green-500/30 w-fit">
                <div class="bg-gray-800 p-3 group-hover:bg-green-500 text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.84 6.366L.041 24l5.808-1.503A12 12 0 0 0 11.944 24c6.627 0 12-5.373 12-12S18.571 0 11.944 0zm0 21.932c-1.848 0-3.664-.482-5.263-1.392l-.377-.216-3.837.994.992-3.69-.25-.395a9.927 9.927 0 0 1-1.512-5.301c0-5.465 4.445-9.91 9.913-9.91s9.911 4.445 9.911 9.91-4.445 9.91-9.91 9.91c0 .001-.004.001-.014.001zm5.286-7.076c-.289-.145-1.713-.846-1.977-.942-.265-.098-.458-.145-.65.145-.192.29-.747.942-.916 1.135-.168.193-.337.217-.626.072-1.914-.959-3.235-1.714-4.52-3.896-.168-.289 0-.441.144-.585.129-.129.289-.337.433-.506.144-.168.192-.289.289-.482.096-.193.048-.362-.024-.506-.072-.145-.65-1.567-.891-2.145-.234-.564-.473-.489-.65-.497-.168-.008-.36-.008-.553-.008-.192 0-.505.072-.77.361-.265.289-1.011.988-1.011 2.41 0 1.422 1.035 2.796 1.179 2.989.144.193 2.036 3.11 4.931 4.363 1.943.839 2.659.897 3.535.753.886-.146 2.868-1.173 3.27-2.308.401-1.135.401-2.108.281-2.308-.12-.193-.458-.313-.747-.458z" /></svg>
                </div>
                <div>
                  <span class="block text-xs uppercase tracking-wider text-blue-300 font-bold mb-0.5">WhatsApp</span>
                  <span class="font-bold">+54 9 221 679-6537</span>
                </div>
              </a>

              <a href="https://instagram.com/laplatarugbyclub" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-4 text-gray-400 hover:text-white transition-colors bg-black/40 p-4 border border-gray-800 hover:border-pink-500/50 w-fit">
                <div class="bg-gray-800 p-3 group-hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </div>
                <div>
                  <span class="block text-xs uppercase tracking-wider text-blue-300 font-bold mb-0.5">Seguinos</span>
                  <span class="font-bold">@laplatarugbyclub</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright y Firma */}
      <div class="container mx-auto px-4 max-w-7xl relative z-10 pt-8 mt-12 border-t border-gray-900 flex justify-center items-center text-sm text-gray-600 font-medium pb-8 md:pb-0">
        <p>&copy; {new Date().getFullYear()} La Plata Rugby Club. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
});
