import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { Link, useLocation } from '@builder.io/qwik-city';

export const onRequest: RequestHandler = (requestEvent) => {
  const session = requestEvent.cookie.get('admin_session');
  const isLoginPage = requestEvent.url.pathname === '/admin/login/';

  if (!session && !isLoginPage) {
    throw requestEvent.redirect(302, '/admin/login');
  }
};

const navLinks = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/admin/staff',
    label: 'Staff',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/admin/autoridades',
    label: 'Autoridades',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    href: '/admin/partidos',
    label: 'Partidos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default component$(() => {
  const location = useLocation();

  return (
    <div class="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside class="w-64 min-h-screen bg-[#0a1128] text-white flex flex-col fixed top-0 left-0 z-40 shadow-2xl">
        {/* Brand */}
        <div class="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div class="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0">
            <span class="text-[#0a1128] font-black text-xs">LP</span>
          </div>
          <div>
            <p class="text-xs font-bold text-yellow-400 uppercase tracking-widest leading-none">Admin</p>
            <p class="text-sm font-semibold text-white leading-tight">LPRC Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav class="flex-1 px-3 py-6 space-y-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/admin'
                ? location.url.pathname === '/admin' || location.url.pathname === '/admin/'
                : location.url.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                class={[
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-yellow-400 text-[#0a1128]'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div class="px-6 py-4 border-t border-white/10">
          <Link
            href="/admin/logout"
            class="flex items-center gap-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </Link>
          <p class="text-xs text-gray-600 mt-2">v1.0 · La Plata RC</p>
        </div>
      </aside>

      {/* Main content area */}
      <main class="flex-1 ml-64 min-h-screen">
        {/* Top bar */}
        <header class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <nav class="text-sm text-gray-500 flex items-center gap-2">
            <span class="text-gray-400">LPRC</span>
            <span>/</span>
            <span class="text-gray-700 font-medium capitalize">
              {location.url.pathname.replace('/admin', '').replace(/\//g, '') || 'Dashboard'}
            </span>
          </nav>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-[#0a1128] flex items-center justify-center">
              <span class="text-yellow-400 font-bold text-xs">A</span>
            </div>
            <span class="text-sm font-medium text-gray-700">Administrador</span>
          </div>
        </header>

        {/* Page content */}
        <div class="p-8">
          <Slot />
        </div>
      </main>
    </div>
  );
});
