import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Используем относительные пути для HashRouter
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})



