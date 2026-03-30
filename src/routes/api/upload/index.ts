import { type RequestHandler } from '@builder.io/qwik-city';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export const onPost: RequestHandler = async (requestEvent) => {
  try {
    const body = (await requestEvent.request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request: requestEvent.request,
      onBeforeGenerateToken: async () => {
        // Only allow videos and images
        return {
          allowedContentTypes: [
            'video/mp4',
            'video/quicktime',
            'video/webm',
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
          ],
          tokenPayload: JSON.stringify({
            // optional metadata
          }),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        // Blob is successfully uploaded. We can do further processing here if needed.
        console.log('Upload completed:', blob.url);
      },
      token: requestEvent.env.get('BLOB_READ_WRITE_TOKEN') as string,
    });

    requestEvent.json(200, jsonResponse);
  } catch (error) {
    console.error('Upload Error:', error);
    requestEvent.json(400, { error: (error as Error).message });
  }
};
