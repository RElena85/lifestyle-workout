import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/lifestyle-workout/', // This is crucial for proper asset loading
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    // Development server settings to enable auto reload and HMR
    server: {
      open: true,      // Automatically open the browser on server start
      hmr: true,       // Enable Hot Module Replacement
      watch: {
        usePolling: true,   // Optional: Use polling which can help in certain file system scenarios
      },
    }, 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
})