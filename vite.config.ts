import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    /**
     * Bundle these into the SSR output instead of leaving them as runtime
     * imports. They ship CommonJS builds, and Node's ESM loader cannot read
     * named exports from CJS, so an externalized import fails at prerender
     * time with "Named export not found".
     *
     * Everything the prerender pass actually renders must be listed here.
     * Symptom of a missing entry: scripts/prerender.mjs throws a SyntaxError
     * naming the package.
     */
    noExternal: [
      'react-helmet-async',
      'react-simple-scroll-up',
      'react-slick',
      'react-modal-video',
      'react-countup',
    ],
  },
})
