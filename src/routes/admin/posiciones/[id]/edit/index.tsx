import { component$ } from '@builder.io/qwik';
import {
  Form,
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { standings } from '~/db/schema';
import { eq } from 'drizzle-orm';

export const useStandingLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const id = Number(requestEvent.params.id);
  if (isNaN(id)) throw requestEvent.redirect(302, '/admin/posiciones');

  const team = await db.query.standings.findFirst({
    where: eq(standings.id, id),
  });

  if (!team) throw requestEvent.redirect(302, '/admin/posiciones');
  return team;
});

export const useUpdateStandingAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);
    
    await db
      .update(standings)
      .set({
        teamName: data.teamName.trim(),
        matchesPlayed: Number(data.matchesPlayed),
        points: Number(data.points),
      })
      .where(eq(standings.id, id));

    throw requestEvent.redirect(302, '/admin/posiciones');
  },
  zod$({
    teamName: z.string().min(1, 'El nombre es obligatorio'),
    matchesPlayed: z.string().min(1, 'Obligatorio'),
    points: z.string().min(1, 'Obligatorio'),
  })
);

export const head: DocumentHead = {
  title: 'Editar Equipo — Posiciones | Admin LPRC',
};

export default component$(() => {
  const standingRecord = useStandingLoader();
  const updateAction = useUpdateStandingAction();

  return (
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Editar Equipo
          </h1>
          <p class="text-sm text-gray-500 mt-1">Modificando puntos y partidos jugados</p>
        </div>
        <Link
          href="/admin/posiciones"
          class="text-sm font-medium text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors"
        >
          Volver
        </Link>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <Form action={updateAction} class="space-y-5">
          <div>
            <label for="team-name" class="block text-sm font-semibold text-gray-700 mb-1.5">
              Equipo
            </label>
            <input
              id="team-name"
              name="teamName"
              type="text"
              required
              value={standingRecord.value.teamName}
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] bg-gray-50"
            />
            {updateAction.value?.fieldErrors?.teamName && (
              <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.teamName}</p>
            )}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="matches-played" class="block text-sm font-semibold text-gray-700 mb-1.5">
                Partidos Jugados (PJ)
              </label>
              <input
                id="matches-played"
                name="matchesPlayed"
                type="number"
                min="0"
                required
                value={standingRecord.value.matchesPlayed}
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
              />
              {updateAction.value?.fieldErrors?.matchesPlayed && (
                <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.matchesPlayed}</p>
              )}
            </div>
            <div>
              <label for="points" class="block text-sm font-semibold text-gray-700 mb-1.5">
                Puntos (Pts)
              </label>
              <input
                id="points"
                name="points"
                type="number"
                min="0"
                required
                value={standingRecord.value.points}
                class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
              />
              {updateAction.value?.fieldErrors?.points && (
                <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.points}</p>
              )}
            </div>
          </div>

          <div class="pt-4 mt-6 border-t border-gray-100 flex justify-end gap-3">
            <Link
              href="/admin/posiciones"
              class="px-5 py-2.5 rounded-lg text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] shadow-md transition-all"
            >
              {updateAction.isRunning ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
});
