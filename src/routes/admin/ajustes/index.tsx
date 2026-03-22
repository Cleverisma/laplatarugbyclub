import { component$, useSignal, $ } from '@builder.io/qwik';
import { Form, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { siteSettings } from '~/db/schema';
import { eq } from 'drizzle-orm';

const DEFAULT_SETTINGS = {
  playersCount: 1199,
  membersCount: 2899,
  followersCount: 61000,
};

export const useSettingsLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
  
  if (!settings) {
    return DEFAULT_SETTINGS;
  }
  return settings;
});

export const useUpdateSettingsAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    
    // Check if record exists
    const [existing] = await db.select({ id: siteSettings.id }).from(siteSettings).where(eq(siteSettings.id, 1));
    
    if (existing) {
      await db.update(siteSettings)
        .set({
          playersCount: Number(data.playersCount),
          membersCount: Number(data.membersCount),
          followersCount: Number(data.followersCount),
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, 1));
    } else {
      await db.insert(siteSettings).values({
        id: 1,
        playersCount: Number(data.playersCount),
        membersCount: Number(data.membersCount),
        followersCount: Number(data.followersCount),
        updatedAt: new Date(),
      });
    }

    return { success: true };
  },
  zod$({
    playersCount: z.string().min(1, 'El número de jugadores es requerido'),
    membersCount: z.string().min(1, 'El número de socios es requerido'),
    followersCount: z.string().min(1, 'El número de seguidores es requerido'),
  }),
);

export const head: DocumentHead = {
  title: 'Ajustes / Contadores — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const settingsLoader = useSettingsLoader();
  const updateAction = useUpdateSettingsAction();
  
  const isSaving = useSignal(false);
  const settings = settingsLoader.value;

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
          Ajustes / Contadores
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          Modificá los números globales que se muestran en las estadísticas de la página principal.
        </p>
      </div>

      {/* Form */}
      <div class="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        {updateAction.value?.success && (
          <div class="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg mb-6 border border-green-200">
            Los contadores se actualizaron correctamente.
          </div>
        )}

        {updateAction.value?.failed && (
          <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
            {updateAction.value.fieldErrors ? (
              <ul class="list-disc list-inside">
                {Object.values(updateAction.value.fieldErrors).map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            ) : (
              'Ocurrió un error al guardar los ajustes.'
            )}
          </div>
        )}

        <Form 
          action={updateAction} 
          class="space-y-6"
          onSubmit$={handleSubmit}
        >
          <div>
            <label for="playersCount" class="block text-sm font-semibold text-gray-700 mb-2">
              Jugadores Históricos
            </label>
            <input
              type="number"
              id="playersCount"
              name="playersCount"
              required
              min="0"
              value={settings.playersCount}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div>
            <label for="membersCount" class="block text-sm font-semibold text-gray-700 mb-2">
              Socios Activos
            </label>
            <input
              type="number"
              id="membersCount"
              name="membersCount"
              required
              min="0"
              value={settings.membersCount}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div>
            <label for="followersCount" class="block text-sm font-semibold text-gray-700 mb-2">
              Seguidores en Redes
            </label>
            <input
              type="number"
              id="followersCount"
              name="followersCount"
              required
              min="0"
              value={settings.followersCount}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div class="pt-4 border-t border-gray-100">
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
                'Guardar Ajustes'
              )}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
});
