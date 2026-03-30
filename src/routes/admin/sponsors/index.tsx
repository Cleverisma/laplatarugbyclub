import { $, component$ } from '@builder.io/qwik';
import { Link, routeLoader$, routeAction$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { sponsors } from '~/db/schema';
import { eq, asc } from 'drizzle-orm';
import { del } from '@vercel/blob';

export const useSponsors = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const allSponsors = await db.select().from(sponsors).orderBy(asc(sponsors.displayOrder), asc(sponsors.id));
  return allSponsors;
});

export const useDeleteSponsorAction = routeAction$(async (data, requestEvent) => {
  const db = getDb(requestEvent.env);
  const sponsorId = Number(data.id);

  if (isNaN(sponsorId)) {
    return { success: false, error: 'ID inválido' };
  }

  // Get the sponsor to find the blob URL
  const sponsor = await db.select().from(sponsors).where(eq(sponsors.id, sponsorId)).get();
  
  if (sponsor && sponsor.logoUrl) {
    try {
      await del(sponsor.logoUrl, {
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
    } catch (e) {
      console.error('Error deleting blob from Vercel', e);
      // Ensure we delete from DB even if vercel fails, but ideally both succeed
    }
  }

  await db.delete(sponsors).where(eq(sponsors.id, sponsorId));

  return { success: true };
});

export const head: DocumentHead = {
  title: 'Sponsors — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const sponsorsList = useSponsors();
  const deleteAction = useDeleteSponsorAction();

  const handleDelete = $((id: number) => {
    if (confirm('¿Estás seguro de que deseas eliminar este sponsor? Esta acción no se puede deshacer.')) {
      deleteAction.submit({ id: id.toString() });
    }
  });

  return (
    <div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1
            class="text-3xl font-black text-gray-900"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Sponsors
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Gestioná los patrocinadores que aparecen en la web.
          </p>
        </div>
        <Link
          href="/admin/sponsors/new"
          class="inline-flex items-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Nuevo Sponsor
        </Link>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm whitespace-nowrap">
            <thead class="bg-gray-50 border-b border-gray-200 uppercase text-xs font-semibold text-gray-600">
              <tr>
                <th scope="col" class="px-6 py-4">Logo</th>
                <th scope="col" class="px-6 py-4">Nombre</th>
                <th scope="col" class="px-6 py-4">Enlace</th>
                <th scope="col" class="px-6 py-4 text-center">Orden</th>
                <th scope="col" class="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              {sponsorsList.value.length === 0 ? (
                <tr>
                  <td colSpan={5} class="px-6 py-12 text-center text-gray-500">
                    No hay sponsors registrados aún.
                  </td>
                </tr>
              ) : (
                sponsorsList.value.map((sponsor) => (
                  <tr key={sponsor.id} class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="w-20 h-10 bg-gray-100 flex py-1 justify-center rounded overflow-hidden border border-gray-200 object-contain">
                        {sponsor.logoUrl ? (
                          <img
                            src={sponsor.logoUrl}
                            alt={sponsor.name}
                            class="w-full h-full object-contain"
                            loading="lazy"
                            width={80}
                            height={40}
                          />
                        ) : (
                          <span class="text-xs text-gray-400">Sin Logo</span>
                        )}
                      </div>
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 text-wrap min-w-40">
                      {sponsor.name}
                    </td>
                    <td class="px-6 py-4 text-gray-500">
                      {sponsor.url ? (
                        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                          Visitar Web
                        </a>
                      ) : (
                        <span class="text-gray-400">-</span>
                      )}
                    </td>
                    <td class="px-6 py-4 text-center text-gray-500">
                      {sponsor.displayOrder}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/sponsors/${sponsor.id}/edit`}
                          class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </Link>
                        <button
                          type="button"
                          onClick$={() => handleDelete(sponsor.id)}
                          class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                          disabled={deleteAction.isRunning}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width={2}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
