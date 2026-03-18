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
import { matches } from '~/db/schema';
import { desc, eq } from 'drizzle-orm';

export const useMatchesLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.select().from(matches).orderBy(desc(matches.matchDate));
});

export const useCreateMatchAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const isPlayed = data.status === 'played';
    await db.insert(matches).values({
      status: data.status as 'played' | 'upcoming',
      matchDate: data.matchDate,
      homeTeam: data.homeTeam.trim(),
      awayTeam: data.awayTeam.trim(),
      homeScore: isPlayed && data.homeScore !== '' ? Number(data.homeScore) : null,
      awayScore: isPlayed && data.awayScore !== '' ? Number(data.awayScore) : null,
      location: data.location.trim(),
      competition: data.competition?.trim() || null,
    });
    return { success: true };
  },
  zod$({
    status: z.enum(['played', 'upcoming']),
    matchDate: z.string().min(1, 'La fecha es obligatoria'),
    homeTeam: z.string().min(1, 'El equipo local es obligatorio'),
    awayTeam: z.string().min(1, 'El equipo visitante es obligatorio'),
    homeScore: z.string().optional(),
    awayScore: z.string().optional(),
    location: z.string().min(1, 'La cancha/sede es obligatoria'),
    competition: z.string().optional(),
  }),
);

export const useDeleteMatchAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(data.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(matches).where(eq(matches.id, id));
    return { success: true };
  },
  zod$({ id: z.string().min(1) }),
);

export const head: DocumentHead = {
  title: 'Partidos — Admin | LPRC',
};

const statusBadge = (status: string) =>
  status === 'played'
    ? 'bg-gray-100 text-gray-600'
    : 'bg-yellow-100 text-yellow-700';

const statusLabel = (status: string) =>
  status === 'played' ? 'Jugado' : 'Próximo';

export default component$(() => {
  const matchList = useMatchesLoader();
  const createAction = useCreateMatchAction();
  const deleteAction = useDeleteMatchAction();

  return (
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Partidos
          </h1>
          <p class="text-sm text-gray-500 mt-1">{matchList.value.length} partidos registrados</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Match list */}
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {matchList.value.length === 0 && (
              <div class="p-10 text-center text-gray-400 text-sm">Sin partidos registrados.</div>
            )}
            <ul class="divide-y divide-gray-100">
              {matchList.value.map((match) => (
                <li key={match.id} class="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <span class={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadge(match.status)}`}>
                      {statusLabel(match.status)}
                    </span>
                    <div>
                      <p class="text-sm font-bold text-gray-900">
                        {match.homeTeam}{' '}
                        {match.status === 'played' && match.homeScore !== null && match.awayScore !== null && (
                          <span class="font-mono text-[#0a1128]">
                            {match.homeScore} – {match.awayScore}
                          </span>
                        )}{' '}
                        {match.awayTeam}
                      </p>
                      <p class="text-xs text-gray-400 mt-0.5">
                        {match.matchDate} · {match.location}
                        {match.competition && ` · ${match.competition}`}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <Link
                      href={`/admin/partidos/${match.id}/edit`}
                      class="text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Editar
                    </Link>
                    <Form action={deleteAction}>
                      <input type="hidden" name="id" value={String(match.id)} />
                      <button
                        type="submit"
                        class="text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                        onClick$={(e) => {
                          if (!confirm(`¿Eliminar el partido ${match.homeTeam} vs ${match.awayTeam}?`)) e.preventDefault();
                        }}
                      >
                        Eliminar
                      </button>
                    </Form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Create form */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 class="text-base font-black text-gray-900 mb-5" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Nuevo Partido
            </h2>
            {createAction.value?.success && (
              <div class="mb-4 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-green-700 text-xs font-medium">
                ✓ Partido agregado correctamente
              </div>
            )}
            <Form action={createAction} class="space-y-4">
              <div>
                <label for="match-status" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Estado *
                </label>
                <select
                  id="match-status"
                  name="status"
                  required
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                >
                  <option value="upcoming">Próximo</option>
                  <option value="played">Jugado</option>
                </select>
              </div>

              <div>
                <label for="match-date" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Fecha *
                </label>
                <input
                  id="match-date"
                  name="matchDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                />
                {createAction.value?.fieldErrors?.matchDate && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.matchDate}</p>
                )}
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="home-team" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Local *
                  </label>
                  <input
                    id="home-team"
                    name="homeTeam"
                    type="text"
                    required
                    placeholder="LPRC"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                </div>
                <div>
                  <label for="away-team" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Visitante *
                  </label>
                  <input
                    id="away-team"
                    name="awayTeam"
                    type="text"
                    required
                    placeholder="Rival"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="home-score" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Pts Local
                  </label>
                  <input
                    id="home-score"
                    name="homeScore"
                    type="number"
                    min="0"
                    placeholder="–"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                </div>
                <div>
                  <label for="away-score" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                    Pts Visitante
                  </label>
                  <input
                    id="away-score"
                    name="awayScore"
                    type="number"
                    min="0"
                    placeholder="–"
                    class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                  />
                </div>
              </div>

              <div>
                <label for="match-location" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Sede / Cancha *
                </label>
                <input
                  id="match-location"
                  name="location"
                  type="text"
                  required
                  placeholder="Ej: Cancha LPRC"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                />
                {createAction.value?.fieldErrors?.location && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.location}</p>
                )}
              </div>

              <div>
                <label for="match-competition" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Competencia
                </label>
                <input
                  id="match-competition"
                  name="competition"
                  type="text"
                  placeholder="Ej: Apertura 2025"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
                />
              </div>

              <button
                type="submit"
                class="w-full py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] transition-colors"
              >
                {createAction.isRunning ? 'Guardando...' : '+ Agregar Partido'}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
