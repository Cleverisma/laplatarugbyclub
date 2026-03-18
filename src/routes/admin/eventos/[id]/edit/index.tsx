import { component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { events } from '~/db/schema';
import { eq } from 'drizzle-orm';

export const useEventLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const id = Number(requestEvent.params.id);
  if (!id || isNaN(id)) throw requestEvent.redirect(302, '/admin/eventos');

  const [event] = await db.select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) throw requestEvent.redirect(302, '/admin/eventos');
  return event;
});

export const useUpdateEventAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });

    await db.update(events).set({
      title: data.title,
      datetime: data.datetime,
      description: data.description,
      imageUrl: data.imageUrl || null,
      displayOrder: Number(data.displayOrder) || 0,
    }).where(eq(events.id, id));

    throw requestEvent.redirect(302, '/admin/eventos');
  },
  zod$({
    title: z.string().min(1, 'El título es obligatorio'),
    datetime: z.string().min(1, 'La fecha/hora es obligatoria'),
    description: z.string().min(1, 'La descripción es obligatoria'),
    imageUrl: z.string().optional(),
    displayOrder: z.string().default('0'),
  }),
);

export const head: DocumentHead = {
  title: 'Editar Evento — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const eventData = useEventLoader();
  const updateAction = useUpdateEventAction();
  const event = eventData.value;
  const descriptionSig = useSignal(event.description);

  return (
    <div>
      {/* Header */}
      <div class="flex items-center gap-4 mb-8">
        <Link
          href="/admin/eventos"
          class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1
            class="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Editar Evento
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Editando: {event.title}
          </p>
        </div>
      </div>

      {/* Form */}
      <div class="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        {updateAction.value?.failed && (
          <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
            Por favor corregí los errores en el formulario.
            {updateAction.value.fieldErrors && (
              <ul class="mt-2 list-disc list-inside">
                {Object.entries(updateAction.value.fieldErrors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Form action={updateAction} class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={event.title}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div>
            <label for="datetime" class="block text-sm font-semibold text-gray-700 mb-2">Fecha / Hora *</label>
            <input
              type="text"
              id="datetime"
              name="datetime"
              required
              value={event.datetime}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Descripción *</label>
            <textarea
              id="description"
              name="description"
              required
              rows={6}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all resize-y"
              bind:value={descriptionSig}
            />
            <p class="text-xs text-gray-400 mt-1">Usá saltos de línea para separar párrafos.</p>
          </div>

          <div>
            <label for="imageUrl" class="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={event.imageUrl || ''}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
            <p class="text-xs text-gray-400 mt-1">Dejá vacío si no tenés imagen.</p>
          </div>

          <div>
            <label for="displayOrder" class="block text-sm font-semibold text-gray-700 mb-2">Orden de Visualización</label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              value={event.displayOrder}
              class="w-32 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
            <p class="text-xs text-gray-400 mt-1">Número menor aparece primero.</p>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              class="inline-flex items-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer"
            >
              Guardar Cambios
            </button>
            <Link
              href="/admin/eventos"
              class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
});
