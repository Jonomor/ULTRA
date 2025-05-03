import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/', //
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 5173,
    open: true,
    // Disabled during production (Vercel has no localhost API)
    // proxy: {
    //   '/socket.io': {
    //     target: 'http://localhost:4000',
    //     ws: true,
    //   },
    //   '/api': {
    //     target: 'http://localhost:4000',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
});



