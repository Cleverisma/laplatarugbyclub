import { component$, useSignal } from '@builder.io/qwik';
import { Form, Link, routeAction$, z, zod$, type DocumentHead } from '@builder.io/qwik-city';
import { getDb } from '~/db/client';
import { verticalVideos } from '~/db/schema';
import { put } from '@vercel/blob';

export const useCreateVerticalVideoAction = routeAction$(
  async (data, requestEvent) => {
    
    let finalVideoUrl = typeof data.videoUrl === 'string' && data.videoUrl.length > 0 ? data.videoUrl : undefined;
    if (data.videoFile && typeof data.videoFile === 'object' && (data.videoFile as Blob).size > 0) {
      const file = data.videoFile as File;
      const { url } = await put(file.name || `video-${Date.now()}.mp4`, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      finalVideoUrl = url;
    }

    let finalThumbnailUrl = typeof data.thumbnailUrl === 'string' && data.thumbnailUrl.length > 0 ? data.thumbnailUrl : undefined;
    if (data.thumbnailFile && typeof data.thumbnailFile === 'object' && (data.thumbnailFile as Blob).size > 0) {
      const file = data.thumbnailFile as File;
      const { url } = await put(file.name || `thumb-${Date.now()}`, file, {
        access: 'public',
        token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN'),
      });
      finalThumbnailUrl = url;
    }

    if (!finalVideoUrl) {
      return requestEvent.fail(400, {
        error: 'Debe subir un archivo de video o proporcionar una URL válida.',
      });
    }

    const db = getDb(requestEvent.env);
    await db.insert(verticalVideos).values({
      id: crypto.randomUUID(),
      title: data.title as string,
      videoUrl: finalVideoUrl,
      thumbnailUrl: finalThumbnailUrl || null,
      displayOrder: Number(data.displayOrder) || 0,
      isActive: data.isActive === 'on' || data.isActive === 'true' ? 1 : 0,
    });
    
    throw requestEvent.redirect(302, '/admin/videos-verticales');
  },
  zod$({
    title: z.string().min(1, 'El título es requerido'),
    videoUrl: z.string().optional(),
    videoFile: z.any().optional(),
    thumbnailUrl: z.string().optional(),
    thumbnailFile: z.any().optional(),
    displayOrder: z.string().default('0'),
    isActive: z.string().optional(),
  }),
);

export const head: DocumentHead = {
  title: 'Nuevo Video Vertical — Admin | La Plata Rugby Club',
};

export default component$(() => {
  const createAction = useCreateVerticalVideoAction();
  const isUploading = useSignal(false);

  return (
    <div>
      {/* Header */}
      <div class="flex items-center gap-4 mb-8">
        <Link
          href="/admin/videos-verticales"
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
            Nuevo Video Vertical
          </h1>
          <p class="text-sm text-gray-500 mt-1">
            Añadir un nuevo video vertical para la página principal.
          </p>
        </div>
      </div>

      {/* Form */}
      <div class="bg-white rounded-xl border border-gray-200 p-8 max-w-2xl">
        {createAction.value?.failed && (
          <div class="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-200">
            {(createAction.value as any).error || 'Por favor corregí los errores en el formulario.'}
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
          onSubmit$={() => { isUploading.value = true; }}
        >
          <div>
            <label for="title" class="block text-sm font-semibold text-gray-700 mb-2">Título del Video</label>
            <input
              type="text"
              id="title"
              name="title"
              class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
              placeholder="Ej: Try inolvidable de 1995"
              required
            />
          </div>

          <div class="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
            <h3 class="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-2">Archivo de Video</h3>
            <div>
              <label for="videoFile" class="block text-sm text-gray-700 mb-2">Subir Video (MP4)</label>
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/mp4,video/quicktime"
                class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
              />
            </div>
            <div>
              <label for="videoUrl" class="block text-sm text-gray-700 mb-2">O pegar URL del Video (YouTube Shorts, etc.)</label>
              <input
                type="text"
                id="videoUrl"
                name="videoUrl"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                placeholder="Ej: https://.../video.mp4"
              />
            </div>
          </div>

          <div class="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-4">
            <h3 class="font-semibold text-gray-900 text-sm border-b border-gray-200 pb-2">Imagen de Portada (Miniatura)</h3>
            <div>
              <label for="thumbnailFile" class="block text-sm text-gray-700 mb-2">Subir Miniatura (Opcional)</label>
              <input
                type="file"
                id="thumbnailFile"
                name="thumbnailFile"
                accept="image/*"
                class="w-full border border-gray-300 bg-white rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1128] file:text-white file:cursor-pointer hover:file:bg-[#0f1d45]"
              />
            </div>
            <div>
              <label for="thumbnailUrl" class="block text-sm text-gray-700 mb-2">O pegar URL de la Miniatura (Opcional)</label>
              <input
                type="text"
                id="thumbnailUrl"
                name="thumbnailUrl"
                class="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition-all"
                placeholder="Ej: https://.../poster.jpg"
              />
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex-1">
              <label for="displayOrder" class="block text-sm font-semibold text-gray-700 mb-2">Orden de Visualización</label>
              <input
                type="number"
                id="displayOrder"
                name="displayOrder"
                value="0"
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
                  checked
                  class="w-5 h-5 text-yellow-400 rounded border-gray-300 focus:ring-yellow-400"
                />
                <span class="text-sm font-semibold text-gray-700">Video Activo</span>
              </label>
              <p class="text-xs text-gray-400 mt-1 ml-8">Si está desmarcado, no se mostrará en el sitio.</p>
            </div>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={createAction.isRunning || isUploading.value}
              class="inline-flex items-center justify-center gap-2 bg-[#0a1128] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0f1d45] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {(createAction.isRunning || isUploading.value) ? (
                <>
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando / Subiendo...
                </>
              ) : (
                'Crear Video'
              )}
            </button>
            <Link
              href="/admin/videos-verticales"
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
