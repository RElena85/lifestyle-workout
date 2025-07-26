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
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', 'tests/**/*', 'test-results/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
        'public/',
        'test-results/',
        'tests/',
        'playwright.config.ts',
        'vite.config.ts',
        'tailwind.config.js',
        'postcss.config.js',
        'eslint.config.js',
        'src/main.tsx',
        'src/**/*.test.*',
        'src/**/*.spec.*'
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90
        }
      }
    }
  }
})