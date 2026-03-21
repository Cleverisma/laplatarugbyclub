// This file can be used to add references for global types like `vite/client`.

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />

declare module '*?jsx&q=60' {
  import type { FunctionComponent, HTMLAttributes } from '@builder.io/qwik';
  const val: FunctionComponent<HTMLAttributes<HTMLImageElement>>;
  export default val;
}

declare module '*?url&w=800&q=70' {
  const value: string;
  export default value;
}
