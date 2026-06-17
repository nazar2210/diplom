import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// GitHub Pages: сайт в /RepoName/ — в CI задаётся VITE_BASE; локально ./
const viteBase = process.env.VITE_BASE
const base =
  viteBase && viteBase !== '' && viteBase !== 'false'
    ? viteBase.endsWith('/')
      ? viteBase
      : `${viteBase}/`
    : './'

export default defineConfig({
  plugins: [react()],
  // Явно задаём PostCSS здесь, чтобы не подхватывался postcss.config.js из родителя (OneDrive),
  // где нет node_modules с tailwindcss — из‑за этого падал dev‑сервер.
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  base,
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
    // В CI (GitHub Actions) sourcemap сильно раздувает память при большом бандле
    sourcemap: !process.env.CI
  }
})



