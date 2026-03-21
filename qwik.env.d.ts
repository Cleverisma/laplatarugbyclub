// This file can be used to add references for global types like `vite/client`.

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />

declare module '*?jsx&format=webp&w=1200&q=50' {
  import type { FunctionComponent, Props } from '@builder.io/qwik';
  const val: FunctionComponent<Props<'img'>>;
  export default val;
}

declare module '*?url&format=webp&w=700&q=50' {
  const value: string;
  export default value;
}

declare module '*?jsx&format=avif' {
  import type { FunctionComponent, Props } from '@builder.io/qwik';
  const val: FunctionComponent<Props<'img'>>;
  export default val;
}
