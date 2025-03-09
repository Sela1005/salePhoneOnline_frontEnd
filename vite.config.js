import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5085,
    proxy: {
      '/api': {
        target: 'https://furious-ariadne-sela-3eda5330.koyeb.app', // Địa chỉ backend
        changeOrigin: true,
        secure: true
      },
    },
  },
});