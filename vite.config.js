import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'Ecommerce-retail'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api/shopify': {
        target: 'https://www.shopkabir.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/shopify/, ''),
      },
    },
  },
}))
