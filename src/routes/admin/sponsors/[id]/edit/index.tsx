import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeLoader$, routeAction$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { sponsors } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { put, del } from '@vercel/blob';

export const useSponsor = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const sponsorId = Number(requestEvent.params.id);
  
  const sponsor = await db.select().from(sponsors).where(eq(sponsors.id, sponsorId)).get();
  
  if (!sponsor) {
    throw requestEvent.redirect(302, '/admin/sponsors');
  }
  
  return sponsor;
});

export const useUpdateSponsorAction = routeAction$(
  async (data, requestEvent) => {
    const db = getDb(requestEvent.env);
    const sponsorId = Number(requestEvent.params.id);
    const currentSponsor = await db.select().from(sponsors).where(eq(sponsors.id, sponsorId)).get();

    if (!currentSponsor) {
       return requestEvent.fail(404, { formErrors: ['Sponsor no encontrado'] });
    }

    let uploadedLogoUrl = currentSponsor.logoUrl;

    if (data.logo && typeof data.logo === 'object' && (data.logo as Blob).size > 0) {
      const file = data.logo as File;
      const fileName = file.name || `sponsor-${Date.now()}`;
      const { url } = await put(fileName, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      uploadedLogoUrl = url;

      // Delete optional older logo to avoid garbage accumulation
      if (currentSponsor.logoUrl) {
         try {
            await del(currentSponsor.logoUrl, {
                token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
            });
         } catch (e) {
             console.error('Error deleting previous logo blob: ', e)
         }
      }
    }

    await db.update(sponsors).set({
      name: data.name,
      url: typeof data.url === 'string' && data.url.length > 0 ? data.url : null,
      logoUrl: uploadedLogoUrl,
      displayOrder: Number(data.displayOrder) || 0,
    }).where(eq(sponsors.id, sponsorId));
    
    throw requestEvent.redirect(302, '/admin/sponsors');
  },
  zod$({
    name: z.string().min(1, 'El nombre es obligatorio'),
    url: z.string().optional(),
    logo: z.any().optional(),
    displayOrder: z.string().default('0'),
  }),
);

export const head: DocumentHead = {
  title: 'Editar Sponsor — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const sponsorData = useSponsor();
  const updateAction = useUpdateSponsorAction();
  const isUploading = useSignal(false);

  const handleSubmit = $((e: Event, currentTarget: HTMLFormElement) => {
    if (isUploading.value || updateAction.isRunning) return;
    // form will post to action automatically. we just flag upload status
    const formData = new FormData(currentTarget);
    const imageFile = formData.get('logo') as File | null;
    if (imageFile && imageFile.size > 0) {
        isUploading.value = true;
    }
  });

  return (
    <div>
      <div class="flex items-center gap-4 mb-8">
        <Link
          href="/admin/sponsors"
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
            Editar Sponsor
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Modificá la información de este patrocinador.
          </p>
        </div>
      </div>

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
            {updateAction.value.formErrors?.length ? (
              <p>{updateAction.value.formErrors[0]}</p>
            ) : null}
          </div>
        )}

        <Form 
          action={updateAction} 
          class="space-y-6"
          enctype="multipart/form-data"
          preventdefault:submit
          onSubmit$={handleSubmit}
        >
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nombre del Sponsor *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={sponsorData.value.name}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: Banco Macro"
            />
          </div>

          <div>
            <label for="url" class="block text-sm font-semibold text-gray-700 mb-2">Enlace Oficial (URL)</label>
            <input
              type="url"
              id="url"
              name="url"
              value={sponsorData.value.url || ''}
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: https://www.macro.com.ar/"
            />
            <p class="text-xs text-gray-400 mt-1">Opcional. Hacia dónde redirigirá al hacer click en el logo.</p>
          </div>

          <div>
             <label class="block text-sm font-semibold text-gray-700 mb-2">Logo Actual</label>
             {sponsorData.value.logoUrl && (
                <div class="mb-4 w-40 h-24 p-2 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                    <img src={sponsorData.value.logoUrl} alt="Current logo" class="max-w-full max-h-full object-contain" width={160} height={96} />
                </div>
             )}
            <label for="logo" class="block text-sm font-semibold text-gray-700 mb-2">Reemplazar Logo</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
            />
            <p class="text-xs text-gray-400 mt-1">Si subís un nuevo archivo borrará el anterior. Dejar vacío para conservar el actual.</p>
          </div>

          <div>
            <label for="displayOrder" class="block text-sm font-semibold text-gray-700 mb-2">Orden de Visualización</label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              value={sponsorData.value.displayOrder}
              class="w-32 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isUploading.value || updateAction.isRunning}
              class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isUploading.value || updateAction.isRunning ? (
                <>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                'Guardar Cambios'
              )}
            </button>
            <Link
              href="/admin/sponsors"
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
