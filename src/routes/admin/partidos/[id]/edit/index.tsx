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
import { eq } from 'drizzle-orm';

export const useMatchLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const id = Number(requestEvent.params.id);
  if (!id || isNaN(id)) throw requestEvent.redirect(302, '/admin/partidos');

  const [match] = await db.select().from(matches).where(eq(matches.id, id));
  if (!match) throw requestEvent.redirect(302, '/admin/partidos');

  return match;
});

export const useUpdateMatchAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });

    const isPlayed = data.status === 'played';
    await db
      .update(matches)
      .set({
        status: data.status as 'played' | 'upcoming',
        matchDate: data.matchDate,
        homeTeam: data.homeTeam.trim(),
        awayTeam: data.awayTeam.trim(),
        homeScore: isPlayed && data.homeScore !== '' ? Number(data.homeScore) : null,
        awayScore: isPlayed && data.awayScore !== '' ? Number(data.awayScore) : null,
        location: data.location.trim(),
        competition: data.competition?.trim() || null,
      })
      .where(eq(matches.id, id));

    throw requestEvent.redirect(302, '/admin/partidos');
  },
  zod$({
    status: z.enum(['played', 'upcoming']),
    matchDate: z.string().min(1, 'La fecha es obligatoria'),
    homeTeam: z.string().min(1, 'El equipo local es obligatorio'),
    awayTeam: z.string().min(1, 'El equipo visitante es obligatorio'),
    homeScore: z.string().optional(),
    awayScore: z.string().optional(),
    location: z.string().min(1, 'La sede es obligatoria'),
    competition: z.string().optional(),
  }),
);

export const useDeleteMatchAction = routeAction$(
  async (_data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(matches).where(eq(matches.id, id));
    throw requestEvent.redirect(302, '/admin/partidos');
  },
  zod$({}),
);

export const head: DocumentHead = {
  title: 'Editar Partido — Admin | LPRC',
};

export default component$(() => {
  const match = useMatchLoader();
  const updateAction = useUpdateMatchAction();
  const deleteAction = useDeleteMatchAction();
  const m = match.value;

  return (
    <div class="max-w-2xl mx-auto">
      <div class="flex items-center gap-4 mb-8">
        <Link
          href="/admin/partidos"
          class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver a Partidos
        </Link>
      </div>

      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Editar Partido
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {m.homeTeam} vs {m.awayTeam} · {m.matchDate}
          </p>
        </div>
        <Form action={deleteAction}>
          <button
            type="submit"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200"
            onClick$={(e) => {
              if (!confirm(`¿Eliminar el partido ${m.homeTeam} vs ${m.awayTeam}?`)) e.preventDefault();
            }}
          >
            Eliminar
          </button>
        </Form>
      </div>

      {updateAction.value?.error && (
        <div class="mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {updateAction.value.error}
        </div>
      )}

      <Form action={updateAction} class="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
        <div>
          <label for="p-status" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Estado *
          </label>
          <select
            id="p-status"
            name="status"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
          >
            <option value="upcoming" selected={m.status === 'upcoming'}>Próximo</option>
            <option value="played" selected={m.status === 'played'}>Jugado</option>
          </select>
        </div>

        <div>
          <label for="p-date" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Fecha *
          </label>
          <input
            id="p-date"
            name="matchDate"
            type="date"
            required
            value={m.matchDate}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="p-home" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Local *
            </label>
            <input
              id="p-home"
              name="homeTeam"
              type="text"
              required
              value={m.homeTeam}
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
            />
          </div>
          <div>
            <label for="p-away" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Visitante *
            </label>
            <input
              id="p-away"
              name="awayTeam"
              type="text"
              required
              value={m.awayTeam}
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="p-home-score" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Pts Local
            </label>
            <input
              id="p-home-score"
              name="homeScore"
              type="number"
              min="0"
              value={m.homeScore !== null ? String(m.homeScore) : ''}
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
            />
          </div>
          <div>
            <label for="p-away-score" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
              Pts Visitante
            </label>
            <input
              id="p-away-score"
              name="awayScore"
              type="number"
              min="0"
              value={m.awayScore !== null ? String(m.awayScore) : ''}
              class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
            />
          </div>
        </div>

        <div>
          <label for="p-location" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Sede / Cancha *
          </label>
          <input
            id="p-location"
            name="location"
            type="text"
            required
            value={m.location}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
          />
        </div>

        <div>
          <label for="p-competition" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Competencia
          </label>
          <input
            id="p-competition"
            name="competition"
            type="text"
            value={m.competition ?? ''}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128]"
          />
        </div>

        <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <Link
            href="/admin/partidos"
            class="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            class="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] transition-colors shadow-sm"
          >
            {updateAction.isRunning ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </Form>
    </div>
  );
});
