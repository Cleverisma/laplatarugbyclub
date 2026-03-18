import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeAction$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { events } from '~/db/schema';
import { put } from '@vercel/blob';
import imageCompression from 'browser-image-compression';

export const useCreateEventAction = routeAction$(
  async (data, requestEvent) => {
    let uploadedImageUrl: string | null = null;

    if (data.image && typeof data.image === 'object' && (data.image as Blob).size > 0) {
      const file = data.image as File;
      const fileName = file.name || `evento-${Date.now()}.webp`;
      const { url } = await put(fileName, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      uploadedImageUrl = url;
    }

    const db = getDb(requestEvent.env);
    await db.insert(events).values({
      title: data.title,
      datetime: data.datetime,
      description: data.description,
      imageUrl: uploadedImageUrl || (typeof data.imageUrl === 'string' && data.imageUrl.length > 0 ? data.imageUrl : null),
      displayOrder: Number(data.displayOrder) || 0,
    });
    throw requestEvent.redirect(302, '/admin/eventos');
  },
  zod$({
    title: z.string().min(1, 'El título es obligatorio'),
    datetime: z.string().min(1, 'La fecha/hora es obligatoria'),
    description: z.string().min(1, 'La descripción es obligatoria'),
    imageUrl: z.string().optional(),
    image: z.any().optional(),
    displayOrder: z.string().default('0'),
  }),
);

export const head: DocumentHead = {
  title: 'Nuevo Evento — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const createAction = useCreateEventAction();
  const descriptionSig = useSignal('');
  const isCompressing = useSignal(false);

  const handleSubmit = $(async (e: Event, currentTarget: HTMLFormElement) => {
    if (isCompressing.value || createAction.isRunning) return;

    isCompressing.value = true;
    try {
      const formData = new FormData(currentTarget);
      const imageFile = formData.get('image') as File | null;

      if (imageFile && imageFile.size > 0 && imageFile.name) {
        const options = {
          maxWidthOrHeight: 1200,
          useWebWorker: true,
          fileType: 'image/webp',
          initialQuality: 0.8,
        };
        const compressedBlob = await imageCompression(imageFile, options);
        const newFileName = imageFile.name.replace(/\.[^/.]+$/, "") + ".webp";
        // Convert Blob to File to preserve name
        const compressedFile = new File([compressedBlob], newFileName, { type: 'image/webp' });
        
        formData.set('image', compressedFile);
      }

      await createAction.submit(formData);
    } catch (error) {
      console.error('Error al comprimir/subir imagen:', error);
    } finally {
      isCompressing.value = false;
    }
  });

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
            Nuevo Evento
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Crear un nuevo evento para el calendario del club.
          </p>
        </div>
      </div>

      {/* Form */}
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
          preventdefault:submit
          onSubmit$={handleSubmit}
        >
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: Sunset en LPRC"
            />
          </div>

          <div>
            <label for="datetime" class="block text-sm font-semibold text-gray-700 mb-2">Fecha / Hora *</label>
            <input
              type="text"
              id="datetime"
              name="datetime"
              required
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: Sábado 14 de Marzo, 15:30 hs"
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
              placeholder="Descripción del evento..."
              bind:value={descriptionSig}
            />
            <p class="text-xs text-gray-400 mt-1">Usá saltos de línea para separar párrafos.</p>
          </div>

          <div>
            <label for="image" class="block text-sm font-semibold text-gray-700 mb-2">Subir Imagen Frontal</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
            />
            <p class="text-xs text-gray-400 mt-1">La imagen se optimizará automáticamente a .webp (1200px) al guardar.</p>
          </div>

          <div>
            <label for="imageUrl" class="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen (Alternativa a la subida)</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="https://ejemplo.com/imagen.jpg (opcional)"
            />
            <p class="text-xs text-gray-400 mt-1">Dejá vacío si subiste una imagen frontal arriba.</p>
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
            <p class="text-xs text-gray-400 mt-1">Número menor aparece primero.</p>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={isCompressing.value || createAction.isRunning}
              class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isCompressing.value || createAction.isRunning ? (
                <>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isCompressing.value ? 'Optimizando...' : 'Guardando...'}
                </>
              ) : (
                'Crear Evento'
              )}
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
