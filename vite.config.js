import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        cookieDomainRewrite: ""
      }
    },
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "imagistically-pseudoancestral-yuonne.ngrok-free.dev"
    ]
  }
})
