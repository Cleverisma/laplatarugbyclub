import { component$ } from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { boardMembers } from '~/db/schema';
import { asc, eq } from 'drizzle-orm';

export const useBoardLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.select().from(boardMembers).orderBy(asc(boardMembers.displayOrder));
});

export const useCreateBoardAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    await db.insert(boardMembers).values({
      fullName: data.fullName.trim(),
      role: data.role.trim(),
      displayOrder: Number(data.displayOrder),
    });
    return { success: true };
  },
  zod$({
    fullName: z.string().min(2, 'El nombre es obligatorio'),
    role: z.string().min(2, 'El cargo es obligatorio'),
    displayOrder: z.string().regex(/^\d+$/, 'Debe ser un número'),
  }),
);

export const useDeleteBoardAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(data.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(boardMembers).where(eq(boardMembers.id, id));
    return { success: true };
  },
  zod$({ id: z.string().min(1) }),
);

export const head: DocumentHead = {
  title: 'Autoridades — Admin | LPRC',
};

export default component$(() => {
  const members = useBoardLoader();
  const createAction = useCreateBoardAction();
  const deleteAction = useDeleteBoardAction();

  // Group by role
  const grouped = members.value.reduce(
    (acc, m) => {
      if (!acc[m.role]) acc[m.role] = [];
      acc[m.role].push(m);
      return acc;
    },
    {} as Record<string, typeof members.value>,
  );

  return (
    <div>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Autoridades
          </h1>
          <p class="text-sm text-gray-500 mt-1">{members.value.length} miembros registrados</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Existing members */}
        <div class="lg:col-span-2 space-y-6">
          {Object.keys(grouped).length === 0 && (
            <div class="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400">
              Sin autoridades registradas aún.
            </div>
          )}
          {Object.entries(grouped).map(([role, people]) => (
            <div key={role} class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div class="px-6 py-3 bg-gray-50 border-b border-gray-100">
                <h2 class="text-sm font-black text-gray-700 uppercase tracking-widest">{role}</h2>
              </div>
              <ul class="divide-y divide-gray-50">
                {people.map((person) => (
                  <li key={person.id} class="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors">
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{person.fullName}</p>
                      <p class="text-xs text-gray-400">Orden: {person.displayOrder}</p>
                    </div>
                    <Form action={deleteAction}>
                      <input type="hidden" name="id" value={String(person.id)} />
                      <button
                        type="submit"
                        class="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        onClick$={(e) => {
                          if (!confirm(`¿Eliminar a "${person.fullName}"?`)) e.preventDefault();
                        }}
                      >
                        Eliminar
                      </button>
                    </Form>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right: Create form */}
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 class="text-base font-black text-gray-900 mb-5" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Nueva Autoridad
            </h2>
            {createAction.value?.success && (
              <div class="mb-4 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-green-700 text-xs font-medium">
                ✓ Autoridad agregada correctamente
              </div>
            )}
            <Form action={createAction} class="space-y-4">
              <div>
                <label for="create-name" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Nombre completo *
                </label>
                <input
                  id="create-name"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Ej: Carlos García"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
                />
                {createAction.value?.fieldErrors?.fullName && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.fullName}</p>
                )}
              </div>

              <div>
                <label for="create-role" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Cargo / Rol *
                </label>
                <input
                  id="create-role"
                  name="role"
                  type="text"
                  required
                  placeholder="Ej: Presidente"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
                />
                <p class="text-xs text-gray-400 mt-1">Los miembros con el mismo cargo se agrupan juntos.</p>
                {createAction.value?.fieldErrors?.role && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.role}</p>
                )}
              </div>

              <div>
                <label for="create-order" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
                  Orden *
                </label>
                <input
                  id="create-order"
                  name="displayOrder"
                  type="number"
                  min="1"
                  required
                  value="10"
                  class="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
                />
                {createAction.value?.fieldErrors?.displayOrder && (
                  <p class="text-red-500 text-xs mt-1">{createAction.value.fieldErrors.displayOrder}</p>
                )}
              </div>

              <button
                type="submit"
                class="w-full py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] transition-colors"
              >
                {createAction.isRunning ? 'Guardando...' : '+ Agregar Autoridad'}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});
