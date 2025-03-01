
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lifestyle-workout/', // This is crucial for proper asset loading
  // resolve: {
  //   alias: {
  //     '@': path.resolve(__dirname, './src'),
  //   },
  // },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       return id.startsWith('node_modules') ? 'vendor' : '';
    //     },
    //   },
    // },
  },
})