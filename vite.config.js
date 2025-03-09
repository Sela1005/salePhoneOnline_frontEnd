import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5085,
    proxy: {
      '/api': {
        target: 'https://salephoneonlinebackend-production.up.railway.app', // Địa chỉ backend
        changeOrigin: true,
        secure: true
      },
    },
  },
});