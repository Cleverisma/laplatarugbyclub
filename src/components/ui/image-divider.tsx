import { component$ } from '@builder.io/qwik';

interface ImageDividerProps {
  imageUrl: string;
}

export const ImageDivider = component$<ImageDividerProps>(({ imageUrl }) => {
  return (
    <div 
      class="w-full relative h-[400px] md:h-[500px] z-20 pointer-events-none"
      style={{
        clipPath: 'polygon(0 8%, 100% 0, 100% 92%, 0 100%)',
        marginTop: '-4vw',
        marginBottom: '-4vw'
      }}
    >
      <div class="absolute inset-0 bg-black/30 z-10" />
      <img 
        src={imageUrl} 
        alt="Divider" 
        class="w-full h-full object-cover"
        width="1920"
        height="1080"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});
