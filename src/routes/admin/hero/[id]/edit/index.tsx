import { $, component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeAction$, routeLoader$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { heroSlides } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { put } from '@vercel/blob';
import imageCompression from 'browser-image-compression';

export const useSlideAdminLoader = routeLoader$(async (requestEvent) => {
  const db = getDb(requestEvent.env);
  const idStr = requestEvent.params.id;
  const idInt = parseInt(idStr, 10);
  if (isNaN(idInt)) throw requestEvent.error(404, 'Slide no encontrado');

  const [slide] = await db.select().from(heroSlides).where(eq(heroSlides.id, idInt));

  if (!slide) {
    throw requestEvent.error(404, 'Slide no encontrado');
  }
  return slide;
});

export const useEditSlideAction = routeAction$(
  async (data, requestEvent) => {
    let uploadedImageUrl: string | null = null;
    const db = getDb(requestEvent.env);
    const id = Number(data.id);

    if (data.image && typeof data.image === 'object' && (data.image as Blob).size > 0) {
      const file = data.image as File;
      const fileName = file.name || `slide-${id}-${Date.now()}.webp`;
      const { url } = await put(fileName, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      uploadedImageUrl = url;
    }

    const finalImageUrl = uploadedImageUrl || (typeof data.imageUrl === 'string' && data.imageUrl.length > 0 ? data.imageUrl : null);

    // If no new image uploaded, and finalImageUrl is somehow missing but it shouldn't if they keep the existing one.
    // The existing one is passed on data.imageUrl if not changed.

    await db
      .update(heroSlides)
      .set({
        title: data.title || null,
        ...(finalImageUrl ? { imageUrl: finalImageUrl } : {}), // Update only if provided
        order: Number(data.order) || 0,
        isActive: data.isActive === 'on' || data.isActive === 'true',
        updatedAt: new Date(),
      })
      .where(eq(heroSlides.id, id));

    throw requestEvent.redirect(302, '/admin/hero');
  },
  zod$({
    id: z.string().min(1),
    title: z.string().optional(),
    imageUrl: z.string().optional(),
    image: z.any().optional(),
    order: z.string().default('0'),
    isActive: z.string().optional(),
  }),
);

export const head: DocumentHead = {
  title: 'Editar Slide — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const slideLoader = useSlideAdminLoader();
  const editAction = useEditSlideAction();
  const isCompressing = useSignal(false);
  
  const slide = slideLoader.value;

  const handleSubmit = $(async (e: Event, currentTarget: HTMLFormElement) => {
    if (isCompressing.value || editAction.isRunning) return;

    isCompressing.value = true;
    try {
      const formData = new FormData(currentTarget);
      const imageFile = formData.get('image') as File | null;

      if (imageFile && imageFile.size > 0 && imageFile.name) {
        const options = {
          maxWidthOrHeight: 1920,
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

      await editAction.submit(formData);
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
          href="/admin/hero"
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
            Editar Slide
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Modificando el slide #{slide.id}
          </p>
        </div>
      </div>

      <div class="flex gap-8 items-start">
        {/* Form */}
        <div class="bg-white rounded-xl border border-gray-200 p-8 flex-1">
          {editAction.value?.failed && (
            <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
              Por favor corregí los errores en el formulario.
              {editAction.value.fieldErrors && (
                <ul class="mt-2 list-disc list-inside">
                  {Object.entries(editAction.value.fieldErrors).map(([field, error]) => (
                    <li key={field}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Form 
            action={editAction} 
            class="space-y-6"
            preventdefault:submit
            onSubmit$={handleSubmit}
          >
            <input type="hidden" name="id" value={String(slide.id)} />
            
            <div>
              <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">Texto / Título</label>
              <input
                type="text"
                id="title"
                name="title"
                value={slide.title || ''}
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                placeholder="Ej: Sumate al plantel superior"
              />
              <p class="text-xs text-gray-400 mt-1">Texto que se mostrará sobre la imagen en la página principal.</p>
            </div>

            <div>
              <label for="image" class="block text-sm font-semibold text-gray-700 mb-2">Subir Nueva Imagen</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
              />
              <p class="text-xs text-gray-400 mt-1">Si subís una nueva imagen, reemplazará la actual (resolución recomendada 1920x1080px).</p>
            </div>

            <div>
              <label for="imageUrl" class="block text-sm font-semibold text-gray-700 mb-2">URL de Imagen Actual</label>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={slide.imageUrl}
                readOnly
                class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none text-gray-500 cursor-not-allowed"
              />
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label for="order" class="block text-sm font-semibold text-gray-700 mb-2">Orden de Visualización</label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={slide.order}
                  class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                />
                <p class="text-xs text-gray-400 mt-1">Número menor aparece primero.</p>
              </div>
              
              <div class="flex-1 flex flex-col justify-center pt-6">
                <label class="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={slide.isActive}
                    class="w-5 h-5 text-yellow-400 rounded border-gray-300 focus:ring-yellow-400"
                  />
                  <span class="text-sm font-semibold text-gray-700">Slide Activo</span>
                </label>
                <p class="text-xs text-gray-400 mt-1 ml-8">Si está desmarcado, no se mostrará en el sitio.</p>
              </div>
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isCompressing.value || editAction.isRunning}
                class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isCompressing.value || editAction.isRunning ? (
                  <>
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isCompressing.value ? 'Optimizando...' : 'Guardando...'}
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
              <Link
                href="/admin/hero"
                class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancelar
              </Link>
            </div>
          </Form>
        </div>

        {/* Preview Sidebar */}
        <div class="w-80 space-y-4">
          <div class="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 class="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider text-xs">Previsualización Actual</h3>
            {slide.imageUrl ? (
              <div class="rounded-lg overflow-hidden border border-gray-200 shadow-sm relative aspect-video bg-black flex items-end justify-center pb-4">
                <img src={slide.imageUrl} alt="Preview" class="absolute inset-0 w-full h-full object-cover opacity-70" />
                {slide.title && (
                   <h2 class="relative text-white font-black italic text-xl px-2 text-center" style={{ fontFamily: "'Oswald', sans-serif" }}>
                     {slide.title}
                   </h2>
                )}
              </div>
            ) : (
              <div class="aspect-video bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
                Sin imagen
              </div>
            )}
            <p class="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
              NOTA: Para ver una previsualización de la nueva imagen que vas a subir, primero debes guardar los cambios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
