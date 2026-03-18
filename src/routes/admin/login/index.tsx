import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';

export const useLoginAction = routeAction$(
  async (data, requestEvent) => {
    const adminPassword = requestEvent.env.get('ADMIN_PASSWORD');

    if (!adminPassword || data.password !== adminPassword) {
      return requestEvent.fail(401, { error: 'Contraseña incorrecta. Intentá de nuevo.' });
    }

    // Set secure session cookie
    requestEvent.cookie.set('lprc_admin_auth', 'authenticated', {
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    throw requestEvent.redirect(302, '/admin/');
  },
  zod$({ password: z.string().min(1, 'La contraseña es obligatoria') }),
);

export const head: DocumentHead = {
  title: 'Login — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const action = useLoginAction();

  return (
    <div class="min-h-screen flex items-center justify-center bg-[#0a1128] px-4">
      {/* Background decoration */}
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-yellow-400/5 blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      <div class="relative w-full max-w-sm">
        {/* Logo / Brand */}
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-400 mb-4 shadow-lg shadow-yellow-400/30">
            <span class="text-[#0a1128] font-black text-2xl" style={{ fontFamily: "'Oswald', sans-serif" }}>LP</span>
          </div>
          <h1 class="text-2xl font-black text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Panel de Administración
          </h1>
          <p class="text-sm text-gray-400 mt-1">La Plata Rugby Club</p>
        </div>

        {/* Card */}
        <div class="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <h2 class="text-base font-semibold text-white mb-6">Iniciar sesión</h2>

          <Form action={action} class="space-y-5">
            <div>
              <label
                for="password"
                class="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
              {action.value?.fieldErrors?.password && (
                <p class="text-red-400 text-xs mt-1.5">{action.value.fieldErrors.password}</p>
              )}
            </div>

            {action.value?.error && (
              <div class="flex items-center gap-2 bg-red-500/15 border border-red-500/30 rounded-lg px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-red-400 text-sm">{action.value.error}</p>
              </div>
            )}

            <button
              type="submit"
              class="w-full bg-yellow-400 hover:bg-yellow-300 text-[#0a1128] font-black uppercase tracking-widest text-sm py-3 rounded-lg transition-all duration-200 shadow-lg shadow-yellow-400/20 disabled:opacity-60"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {action.isRunning ? 'Verificando...' : 'Ingresar'}
            </button>
          </Form>
        </div>

        <p class="text-center text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()} La Plata Rugby Club
        </p>
      </div>
    </div>
  );
});
