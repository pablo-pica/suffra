import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    topLevelAwait()
  ],
  define: {
    // Map global variable to globalThis for node modules compatibility in browser
    global: 'globalThis',
  },
  build: {
    target: 'esnext', // Required for WASM and Top-level await
    minify: false,
  },
  optimizeDeps: {
    exclude: ['@midnight-ntwrk/compact-runtime']
  }
});
