import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const useProfileLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const userIdStr = requestEvent.cookie.get('auth_session')?.value;
  const userId = Number(userIdStr);
  
  if (!userIdStr || isNaN(userId)) return null;

  const [user] = await db.select().from(users).where(eq(users.id, userId));
  return user ? { id: user.id, username: user.username, lastLogin: user.lastLogin } : null;
});

export const useUpdateProfileAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const userIdStr = requestEvent.cookie.get('auth_session')?.value;
    const userId = Number(userIdStr);
    
    if (!userIdStr || isNaN(userId)) return { success: false, error: 'No autorizado' };

    const [user] = await db.select().from(users).where(eq(users.id, userId));
    
    if (!user) {
      return { success: false, error: 'No se encontró el usuario administrador' };
    }

    const updates: Partial<typeof users.$inferInsert> = {
      username: data.username as string,
    };

    if (data.newPassword && typeof data.newPassword === 'string' && data.newPassword.trim().length > 0) {
      updates.passwordHash = bcrypt.hashSync(data.newPassword.trim(), 10);
    }

    await db.update(users).set(updates).where(eq(users.id, user.id));

    return { success: true };
  },
  zod$({
    username: z.string().min(1, 'El nombre de usuario es requerido'),
    newPassword: z.string().optional(),
  }),
);

export const head: DocumentHead = {
  title: 'Mi Perfil — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const profileLoader = useProfileLoader();
  const updateAction = useUpdateProfileAction();
  
  const isSaving = useSignal(false);
  const profile = profileLoader.value;

  const handleSubmit = $(() => {
    if (updateAction.isRunning) return;
    isSaving.value = true;
  });

  return (
    <div>
      {/* Page header */}
      <div class="mb-8">
        <h1
          class="text-3xl font-black text-gray-900"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Mi Perfil
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Actualiza tus credenciales de acceso.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-gray-200 p-8">
            {updateAction.value?.success && (
              <div class="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-6 border border-green-200">
                Las credenciales se actualizaron correctamente.
              </div>
            )}

            {updateAction.value?.failed && (
              <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
                {updateAction.value.fieldErrors ? (
                  <ul class="list-disc list-inside">
                    {Object.values(updateAction.value.fieldErrors).map((error, idx) => (
                      <li key={idx}>{error as string}</li>
                    ))}
                  </ul>
                ) : (
                  (updateAction.value as any).error || 'Ocurrió un error al guardar.'
                )}
              </div>
            )}

            <Form 
              action={updateAction} 
              class="space-y-6"
              onSubmit$={handleSubmit}
            >
              <div>
                <label for="username" class="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={profile?.username || ''}
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                />
              </div>

              <div>
                <label for="newPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Dejar vacio para mantener la actual"
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all placeholder:text-gray-400"
                />
                <p class="text-xs text-gray-400 mt-1">
                  Mínimo 6 caracteres. Si no quieres cambiar tu contraseña, deja este campo vacío.
                </p>
              </div>

              <div class="pt-4 border-t border-gray-100 flex gap-4">
                <button
                  type="submit"
                  disabled={updateAction.isRunning}
                  class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
                >
                  {updateAction.isRunning ? (
                    <>
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Guardando...
                    </>
                  ) : (
                    'Guardar Cambios'
                  )}
                </button>
              </div>
            </Form>
          </div>
        </div>

        {/* Info Column */}
        <div class="lg:col-span-1">
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
              Información de la Cuenta
            </h3>
            
            <div class="space-y-4">
              <div>
                <p class="text-xs text-gray-500 uppercase font-semibold">Último Acceso</p>
                <p class="text-sm text-gray-900 font-medium mt-1">
                  {profile?.lastLogin ? new Date(profile.lastLogin).toLocaleString('es-AR') : 'Nunca'}
                </p>
              </div>
              
              <div>
                <p class="text-xs text-gray-500 uppercase font-semibold">Rol</p>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mt-1">
                  Administrador
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
