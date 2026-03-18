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

export const useDivisionsLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.query.divisions.findMany({
    orderBy: (divisions, { asc }) => [asc(divisions.displayOrder)],
  });
});

export const useCreateStaffAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    await db.insert((await import('~/db/schema')).staffMembers).values({
      divisionId: Number(data.divisionId),
      fullName: data.fullName.trim(),
      role: data.role.trim(),
      displayOrder: Number(data.displayOrder),
    });
    throw requestEvent.redirect(302, '/admin/staff');
  },
  zod$({
    divisionId: z.string().min(1, 'Seleccioná una división'),
    fullName: z.string().min(2, 'El nombre es obligatorio'),
    role: z.string().min(2, 'El rol es obligatorio'),
    displayOrder: z.string().regex(/^\d+$/, 'Debe ser un número'),
  }),
);

export const head: DocumentHead = {
  title: 'Nuevo Miembro — Admin | LPRC',
};

export default component$(() => {
  const action = useCreateStaffAction();
  const divisions = useDivisionsLoader();

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
          Volver al Staff de entrenadores
        </Link>
      </div>

      <h1 class="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
        Nuevo Miembro de Staff de entrenadores
      </h1>
      <p class="text-sm text-gray-500 mb-8">Completá los datos para agregar un nuevo integrante.</p>

      <Form action={action} class="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
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
            <option value="">— Seleccioná una división —</option>
            {divisions.value.map((div) => (
              <option key={div.id} value={String(div.id)}>
                {`${div.name} (${div.groupType})`}
              </option>
            ))}
          </select>
          {action.value?.fieldErrors?.divisionId && (
            <p class="text-red-500 text-xs mt-1">{action.value.fieldErrors.divisionId}</p>
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
            value={action.formData?.get('fullName') as string ?? ''}
            placeholder="Ej: Juan Pérez"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          {action.value?.fieldErrors?.fullName && (
            <p class="text-red-500 text-xs mt-1">{action.value.fieldErrors.fullName}</p>
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
            value={action.formData?.get('role') as string ?? ''}
            placeholder="Ej: Entrenador Principal"
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          {action.value?.fieldErrors?.role && (
            <p class="text-red-500 text-xs mt-1">{action.value.fieldErrors.role}</p>
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
            value={action.formData?.get('displayOrder') as string ?? '1'}
            class="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a1128] focus:border-transparent"
          />
          <p class="text-xs text-gray-400 mt-1">Números más bajos aparecen primero (1 = primero).</p>
          {action.value?.fieldErrors?.displayOrder && (
            <p class="text-red-500 text-xs mt-1">{action.value.fieldErrors.displayOrder}</p>
          )}
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
            {action.isRunning ? 'Guardando...' : 'Crear Miembro'}
          </button>
        </div>
      </Form>
    </div>
  );
});
