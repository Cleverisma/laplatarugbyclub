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
import { staffMembers } from '~/db/schema';
import { eq } from 'drizzle-orm';

export const useStaffMemberLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const id = Number(requestEvent.params.id);

  if (!id || isNaN(id)) throw requestEvent.redirect(302, '/admin/staff');

  const [divisions, member] = await Promise.all([
    db.query.divisions.findMany({
      orderBy: (divisions, { asc }) => [asc(divisions.displayOrder)],
    }),
    db.query.staffMembers.findFirst({
      where: eq(staffMembers.id, id),
      with: { division: true },
    }),
  ]);

  if (!member) throw requestEvent.redirect(302, '/admin/staff');

  return { member, divisions };
});

export const useUpdateStaffAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);

    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });

    await db
      .update(staffMembers)
      .set({
        divisionId: Number(data.divisionId),
        fullName: data.fullName.trim(),
        role: data.role.trim(),
        displayOrder: Number(data.displayOrder),
      })
      .where(eq(staffMembers.id, id));

    throw requestEvent.redirect(302, '/admin/staff');
  },
  zod$({
    divisionId: z.string().min(1, 'Seleccioná una división'),
    fullName: z.string().min(2, 'El nombre es obligatorio'),
    role: z.string().min(2, 'El rol es obligatorio'),
    displayOrder: z.string().regex(/^\d+$/, 'Debe ser un número'),
  }),
);

export const useDeleteStaffAction = routeAction$(
  async (_data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(requestEvent.params.id);

    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });

    await db.delete(staffMembers).where(eq(staffMembers.id, id));
    throw requestEvent.redirect(302, '/admin/staff');
  },
  zod$({}),
);

export const head: DocumentHead = {
  title: 'Editar Miembro — Admin | LPRC',
};

export default component$(() => {
  const loaderData = useStaffMemberLoader();
  const updateAction = useUpdateStaffAction();
  const deleteAction = useDeleteStaffAction();
  const { member, divisions } = loaderData.value;

  return (
    <div class="max-w-2xl mx-auto">
      {/* Header */}
      <div class="flex items-center gap-4 mb-8">
        <Link
          href="/admin/staff"
          class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al Staff
        </Link>
      </div>

      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black text-gray-900" style={{ fontFamily: "'Oswald', sans-serif" }}>
            Editar Miembro
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Modificando: <strong>{member.fullName}</strong>
          </p>
        </div>

        {/* Delete button */}
        <Form action={deleteAction}>
          <button
            type="submit"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200"
            onClick$={(e) => {
              if (!confirm(`¿Eliminar a "${member.fullName}"? Esta acción no se puede deshacer.`)) {
                e.preventDefault();
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
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
        {/* Division */}
        <div>
          <label for="divisionId" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            División *
          </label>
          <select
            id="divisionId"
            name="divisionId"
            required
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          >
            {divisions.map((div) => (
              <option
                key={div.id}
                value={String(div.id)}
                selected={div.id === member.divisionId}
              >
                {`${div.name} (${div.groupType})`}
              </option>
            ))}
          </select>
          {updateAction.value?.fieldErrors?.divisionId && (
            <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.divisionId}</p>
          )}
        </div>

        {/* Full name */}
        <div>
          <label for="fullName" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Nombre completo *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={member.fullName}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          {updateAction.value?.fieldErrors?.fullName && (
            <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.fullName}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label for="role" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Rol / Cargo *
          </label>
          <input
            id="role"
            name="role"
            type="text"
            required
            value={member.role}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          {updateAction.value?.fieldErrors?.role && (
            <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.role}</p>
          )}
        </div>

        {/* Display order */}
        <div>
          <label for="displayOrder" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Orden de visualización *
          </label>
          <input
            id="displayOrder"
            name="displayOrder"
            type="number"
            min="1"
            required
            value={member.displayOrder}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          <p class="text-xs text-gray-400 mt-1">Números más bajos aparecen primero.</p>
          {updateAction.value?.fieldErrors?.displayOrder && (
            <p class="text-red-500 text-xs mt-1">{updateAction.value.fieldErrors.displayOrder}</p>
          )}
        </div>

        {/* Info */}
        <div class="bg-gray-50 rounded-lg px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
          <span>ID: <strong class="text-gray-600 font-mono">{member.id}</strong></span>
          <span>·</span>
          <span>División actual: <strong class="text-gray-600">{member.division.name}</strong></span>
        </div>

        {/* Actions */}
        <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
          <Link
            href="/admin/staff"
            class="px-5 py-2.5 rounded-lg text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            class="px-6 py-2.5 rounded-lg text-sm font-bold bg-[#0a1128] text-white hover:bg-[#0f1d45] transition-colors shadow-sm disabled:opacity-60"
          >
            {updateAction.isRunning ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </Form>
    </div>
  );
});
