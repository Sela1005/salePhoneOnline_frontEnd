import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5085,
    proxy: {
      '/api': {
        target: process.env.VITE_SERVER_HOST_CONF,
        changeOrigin: true,
        secure: true
      },
    },
  },
});