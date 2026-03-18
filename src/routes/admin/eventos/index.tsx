import { component$ } from '@builder.io/qwik';
import { Form, Link, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { events } from '~/db/schema';
import { eq, asc } from 'drizzle-orm';

export const useEventsAdminLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.select().from(events).orderBy(asc(events.displayOrder));
});

export const useDeleteEventAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(data.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(events).where(eq(events.id, id));
    return { success: true };
  },
  zod$({ id: z.string().min(1) }),
);

export const head: DocumentHead = {
  title: 'Gestión de Eventos — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const eventsLoader = useEventsAdminLoader();
  const deleteAction = useDeleteEventAction();
  const eventsList = eventsLoader.value;

  return (
    <div>
      {/* Page header */}
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1
            class="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Eventos
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {eventsList.length} evento{eventsList.length !== 1 ? 's' : ''} registrado{eventsList.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/eventos/new"
          class="inline-flex items-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Evento
        </Link>
      </div>

      {/* No data */}
      {eventsList.length === 0 && (
        <div class="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <p class="text-4xl mb-3">📅</p>
          <p class="text-gray-500 font-medium">No hay eventos registrados aún.</p>
          <Link href="/admin/eventos/new" class="inline-block mt-4 text-sm text-yellow-600 font-semibold hover:underline">
            + Crear primer evento
          </Link>
        </div>
      )}

      {/* Events table */}
      {eventsList.length > 0 && (
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th class="text-left px-6 py-3 font-semibold">#</th>
                  <th class="text-left px-6 py-3 font-semibold">Título</th>
                  <th class="text-left px-6 py-3 font-semibold">Fecha/Hora</th>
                  <th class="text-left px-6 py-3 font-semibold">Imagen</th>
                  <th class="text-left px-6 py-3 font-semibold">Orden</th>
                  <th class="text-right px-6 py-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {eventsList.map((event, idx) => (
                  <tr
                    key={event.id}
                    class={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                  >
                    <td class="px-6 py-3 text-gray-400 font-mono text-xs">{event.id}</td>
                    <td class="px-6 py-3">
                      <span class="font-semibold text-gray-900">{event.title}</span>
                      <p class="text-xs text-gray-400 mt-0.5 truncate max-w-xs">{event.description.split('\n')[0]}</p>
                    </td>
                    <td class="px-6 py-3">
                      <span class="inline-block bg-yellow-50 text-yellow-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {event.datetime}
                      </span>
                    </td>
                    <td class="px-6 py-3 text-gray-500 text-xs">
                      {event.imageUrl ? (
                        <span class="text-green-600">✓ Sí</span>
                      ) : (
                        <span class="text-gray-400">—</span>
                      )}
                    </td>
                    <td class="px-6 py-3 text-gray-500 font-mono text-xs">{event.displayOrder}</td>
                    <td class="px-6 py-3">
                      <div class="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/eventos/${event.id}/edit`}
                          class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </Link>
                        <Form action={deleteAction}>
                          <input type="hidden" name="id" value={String(event.id)} />
                          <button
                            type="submit"
                            class="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            onClick$={(e) => {
                              if (!confirm(`¿Eliminar el evento "${event.title}"?`)) e.preventDefault();
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
        </div>
      )}
    </div>
  );
});
