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
import { desc, eq } from 'drizzle-orm';

export const useStandingsLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.select().from(standings).orderBy(desc(standings.points));
});

export const useCreateStandingAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    await db.insert(standings).values({
      teamName: data.teamName.trim(),
      matchesPlayed: Number(data.matchesPlayed),
      points: Number(data.points),
    });
    return { success: true };
  },
  zod$({
    teamName: z.string().min(1, 'El nombre del equipo es obligatorio'),
    matchesPlayed: z.string().min(1, 'Partidos jugados es obligatorio'),
    points: z.string().min(1, 'Puntos es obligatorio'),
  }),
);

export const useDeleteStandingAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(data.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(standings).where(eq(standings.id, id));
    return { success: true };
  },
  zod$({ id: z.string().min(1) }),
);

export const head: DocumentHead = {
  title: 'Posiciones — Admin | LPRC',
};

export default component$(() => {
  const standingsList = useStandingsLoader();
  const createAction = useCreateStandingAction();
  const deleteAction = useDeleteStandingAction();

  return (
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Posiciones URBA
          </h1>
          <p class="text-sm text-gray-500 mt-1">{standingsList.value.length} equipos registrados en la tabla</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Standings list */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {standingsList.value.length === 0 && (
              <div class="p-10 text-center text-gray-400 text-sm">Aún no hay equipos cargados.</div>
            )}
            
            {standingsList.value.length > 0 && (
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-sm">
                  <thead class="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th class="px-6 py-3 font-semibold text-gray-500 uppercase tracking-widest text-xs">Pos</th>
                      <th class="px-6 py-3 font-semibold text-gray-500 uppercase tracking-widest text-xs">Equipo</th>
                      <th class="px-6 py-3 font-semibold text-gray-500 uppercase tracking-widest text-xs text-center">PJ</th>
                      <th class="px-6 py-3 font-semibold text-gray-500 uppercase tracking-widest text-xs text-center text-[#0a1128]">Pts</th>
                      <th class="px-6 py-3 font-semibold text-gray-500 uppercase tracking-widest text-xs text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-100">
                    {standingsList.value.map((team, index) => (
                      <tr key={team.id} class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 font-bold text-gray-400">{index + 1}º</td>
                        <td class="px-6 py-4 font-bold text-gray-900">{team.teamName}</td>
                        <td class="px-6 py-4 text-center text-gray-500">{team.matchesPlayed}</td>
                        <td class="px-6 py-4 text-center font-bold text-[#0a1128] text-lg">{team.points}</td>
                        <td class="px-6 py-4 text-right">
                          <div class="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/posiciones/${team.id}/edit`}
                              class="text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Editar
                            </Link>
                            <Form action={deleteAction}>
                              <input type="hidden" name="id" value={String(team.id)} />
                              <button
                                type="submit"
                                class="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                                onClick$={(e) => {
                                  if (!confirm(`¿Eliminar al equipo ${team.teamName}?`)) e.preventDefault();
                                }}
                              >
                                Eliminar
                              </button>
                            </Form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Right: Create form */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 class="text-base font-black text-gray-900 mb-5" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Agregar Equipo
            </h2>
            {createAction.value?.success && (
              <div class="mb-4 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-green-700 text-xs font-medium">
                ✓ Equipo agregado correctamente
              </div>
            )}
            <Form action={createAction} class="space-y-4">
              <div>
                <label for="team-name" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Nombre del Equipo *
                </label>
                <input
                  id="team-name"
                  name="teamName"
                  type="text"
                  required
                  placeholder="LPRC"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                />
                {createAction.value?.fieldErrors?.teamName && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.teamName}</p>
                )}
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="matches-played" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    PJ *
                  </label>
                  <input
                    id="matches-played"
                    name="matchesPlayed"
                    type="number"
                    min="0"
                    required
                    placeholder="12"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                  {createAction.value?.fieldErrors?.matchesPlayed && (
                    <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.matchesPlayed}</p>
                  )}
                </div>
                <div>
                  <label for="points" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Puntos *
                  </label>
                  <input
                    id="points"
                    name="points"
                    type="number"
                    min="0"
                    required
                    placeholder="35"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                  {createAction.value?.fieldErrors?.points && (
                    <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.points}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                class="w-full py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] transition-colors"
              >
                {createAction.isRunning ? 'Guardando...' : '+ Agregar Equipo'}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
