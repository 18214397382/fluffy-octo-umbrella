import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    allowedHosts: ['0022b07b88d145.lhr.life'],
  },
  preview: {
    allowedHosts: ['0022b07b88d145.lhr.life'],
  },
})
