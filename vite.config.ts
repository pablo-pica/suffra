import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    wasm(),
    topLevelAwait(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    })
  ],

  define: {
    // Map global variable to globalThis for node modules compatibility in browser
    global: 'globalThis',
  },
  resolve: {
    alias: {
      'isomorphic-ws': fileURLToPath(new URL('./src/shims/isomorphic-ws-browser.ts', import.meta.url)),
      'isomorphic-ws/browser.js': fileURLToPath(new URL('./src/shims/isomorphic-ws-browser.ts', import.meta.url)),
    },
  },
  build: {
    target: 'esnext', // Required for WASM and Top-level await
    minify: false,
  },
  optimizeDeps: {
    exclude: ['@midnight-ntwrk/compact-runtime']
  }
});
