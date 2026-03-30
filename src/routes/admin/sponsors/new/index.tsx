import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeAction$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { sponsors } from '~/db/schema';
import { put } from '@vercel/blob';

export const useCreateSponsorAction = routeAction$(
  async (data, requestEvent) => {
    let uploadedLogoUrl: string | null = null;

    if (data.logo && typeof data.logo === 'object' && (data.logo as Blob).size > 0) {
      const file = data.logo as File;
      const fileName = file.name || `sponsor-${Date.now()}`;
      const { url } = await put(fileName, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      uploadedLogoUrl = url;
    }

    const db = getDb(requestEvent.env);
    await db.insert(sponsors).values({
      name: data.name,
      url: typeof data.url === 'string' && data.url.length > 0 ? data.url : null,
      logoUrl: uploadedLogoUrl || '', // should be enforced locally
      displayOrder: Number(data.displayOrder) || 0,
    });
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
  title: 'Nuevo Sponsor — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const createAction = useCreateSponsorAction();
  const isUploading = useSignal(false);

  const handleSubmit = $((e: Event, currentTarget: HTMLFormElement) => {
    if (isUploading.value || createAction.isRunning) return;
    isUploading.value = true;
    
    // El formulario realiza el post tradicional y routeAction$ lo recoge en backend
    const formData = new FormData(currentTarget);
    const imageFile = formData.get('logo') as File | null;
    
    if (!imageFile || imageFile.size === 0) {
      isUploading.value = false;
      alert('Es necesario subir un logo.');
      return;
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
            Nuevo Sponsor
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Agregar un nuevo patrocinador a la grilla inferior del sitio.
          </p>
        </div>
      </div>

      <div class="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        {createAction.value?.failed && (
          <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
            Por favor corregí los errores en el formulario.
            {createAction.value.fieldErrors && (
              <ul class="mt-2 list-disc list-inside">
                {Object.entries(createAction.value.fieldErrors).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <Form 
          action={createAction} 
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
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: Banco Macro"
            />
            <p class="text-xs text-gray-400 mt-1">Se utiliza para accesibilidad y como tooltip del logo.</p>
          </div>

          <div>
            <label for="url" class="block text-sm font-semibold text-gray-700 mb-2">Enlace Oficial (URL)</label>
            <input
              type="url"
              id="url"
              name="url"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: https://www.macro.com.ar/"
            />
            <p class="text-xs text-gray-400 mt-1">Opcional. Hacia dónde redirigirá al hacer click en el logo.</p>
          </div>

          <div>
            <label for="logo" class="block text-sm font-semibold text-gray-700 mb-2">Subir Logo *</label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
            />
            <p class="text-xs text-gray-400 mt-1">Se recomienda usar PNG transparente o SVG para mejor visualización. Será guardado en Vercel Blob.</p>
          </div>

          <div>
            <label for="displayOrder" class="block text-sm font-semibold text-gray-700 mb-2">Orden de Visualización</label>
            <input
              type="number"
              id="displayOrder"
              name="displayOrder"
              value="0"
              class="w-32 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
            />
            <p class="text-xs text-gray-400 mt-1">El número menor aparece primero leyendo de izquierda a derecha.</p>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isUploading.value || createAction.isRunning}
              class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isUploading.value || createAction.isRunning ? (
                <>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                'Crear Sponsor'
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
