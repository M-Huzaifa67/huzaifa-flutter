// ============================================================
// vite.config.js
// Vite build configuration
// ============================================================

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: { main: './index.html' },
    },
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
  },
  preview: {
    port: 4173,
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore'],
  },
});
