import { component$, Slot } from '@builder.io/qwik';
import { Link, useLocation, routeLoader$ } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';

// 1. LA BARRERA DE SEGURIDAD (Se ejecuta en el servidor antes de renderizar nada)
export const onRequest: RequestHandler = async ({ cookie, url, redirect }) => {
    const currentPath = url.pathname.replace(/\/$/, '');
    const isLoginPage = currentPath === '/admin/login';
    const hasSession = cookie.has('auth_session');

    if (!hasSession && !isLoginPage) {
        throw redirect(302, '/admin/login/');
    }
    if (hasSession && isLoginPage) {
        throw redirect(302, '/admin/');
    }
};

export const useAdminUserLoader = routeLoader$(async (requestEvent) => {
  const userIdStr = requestEvent.cookie.get('auth_session')?.value;
  // If no session or old string-based session format
  if (!userIdStr || isNaN(Number(userIdStr))) return null;
  
  const db = getDb(requestEvent.env);
  const [user] = await db.select({ username: users.username }).from(users).where(eq(users.id, Number(userIdStr)));
  return user ? user.username : null;
});

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
    href: '/admin/hero',
    label: 'Hero Slider',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/admin/videos-verticales',
    label: 'Videos Verticales',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/admin/staff',
    label: 'Staff de entrenadores',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/admin/autoridades',
    label: 'Comisión Directiva 2026',
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
  {
    href: '/admin/posiciones',
    label: 'Posiciones URBA',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    href: '/admin/eventos',
    label: 'Eventos',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    href: '/admin/ajustes',
    label: 'Ajustes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/admin/perfil',
    label: 'Mi Perfil',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export default component$(() => {
  const location = useLocation();
  const adminUser = useAdminUserLoader();

  // Login page renders without the admin sidebar/header
  const isLoginPage = location.url.pathname.startsWith('/admin/login');
  if (isLoginPage) {
    return <Slot />;
  }

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
              <span class="text-yellow-400 font-bold text-xs uppercase">
                {adminUser.value ? adminUser.value.charAt(0) : 'A'}
              </span>
            </div>
            <span class="text-sm font-medium text-gray-700 capitalize">
              {adminUser.value || 'Administrador'}
            </span>
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
