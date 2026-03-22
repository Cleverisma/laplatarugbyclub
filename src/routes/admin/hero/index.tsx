import { component$ } from '@builder.io/qwik';
import { Form, Link, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { heroSlides } from '~/db/schema';
import { eq, asc } from 'drizzle-orm';

export const useHeroAdminLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  return db.select().from(heroSlides).orderBy(asc(heroSlides.order));
});

export const useDeleteSlideAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const id = Number(data.id);
    if (!id || isNaN(id)) return requestEvent.fail(400, { error: 'ID inválido' });
    await db.delete(heroSlides).where(eq(heroSlides.id, id));
    return { success: true };
  },
  zod$({ id: z.string().min(1) }),
);

export const head: DocumentHead = {
  title: 'Gestión de Hero Slider — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const slidesLoader = useHeroAdminLoader();
  const deleteAction = useDeleteSlideAction();
  const slidesList = slidesLoader.value;

  return (
    <div>
      {/* Page header */}
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1
            class="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Hero Slider
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            {slidesList.length} slide{slidesList.length !== 1 ? 's' : ''} registrado{slidesList.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/hero/new"
          class="inline-flex items-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Slide
        </Link>
      </div>

      {/* No data */}
      {slidesList.length === 0 && (
        <div class="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <p class="text-4xl mb-3">🖼️</p>
          <p class="text-gray-500 font-medium">No hay slides registrados aún.</p>
          <Link href="/admin/hero/new" class="inline-block mt-4 text-sm text-yellow-600 font-semibold hover:underline">
            + Crear primer slide
          </Link>
        </div>
      )}

      {/* Table */}
      {slidesList.length > 0 && (
        <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th class="text-left px-6 py-3 font-semibold w-16">#</th>
                  <th class="text-left px-6 py-3 font-semibold w-24">Imagen</th>
                  <th class="text-left px-6 py-3 font-semibold">Título</th>
                  <th class="text-left px-6 py-3 font-semibold">Estado</th>
                  <th class="text-left px-6 py-3 font-semibold">Orden</th>
                  <th class="text-right px-6 py-3 font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {slidesList.map((slide, idx) => (
                  <tr
                    key={slide.id}
                    class={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}
                  >
                    <td class="px-6 py-3 text-gray-400 font-mono text-xs">{slide.id}</td>
                    <td class="px-6 py-3">
                      <div class="w-16 h-10 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                        {slide.imageUrl ? (
                           <img src={slide.imageUrl} alt={slide.title || 'Slide'} class="w-full h-full object-cover" loading="lazy" />
                        ) : (
                           <span class="text-xs text-gray-400">Sin img</span>
                        )}
                      </div>
                    </td>
                    <td class="px-6 py-3">
                      <span class="font-semibold text-gray-900">{slide.title || <span class="text-gray-400 italic">Sin título</span>}</span>
                    </td>
                    <td class="px-6 py-3">
                      {slide.isActive ? (
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                          <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Activo
                        </span>
                      ) : (
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                          <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td class="px-6 py-3 text-gray-500 font-mono text-xs">{slide.order}</td>
                    <td class="px-6 py-3">
                      <div class="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/hero/${slide.id}/edit`}
                          class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </Link>
                        <Form action={deleteAction}>
                          <input type="hidden" name="id" value={String(slide.id)} />
                          <button
                            type="submit"
                            class="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            onClick$={(e) => {
                              if (!confirm(`¿Eliminar el slide?`)) e.preventDefault();
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
