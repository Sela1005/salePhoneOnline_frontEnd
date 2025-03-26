import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5085,
    proxy: {
      '/api': {
        target: 'http://14.225.218.234:5082', // Địa chỉ backend
        changeOrigin: true,
        secure: true
      },
    },
  },
});