import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "@/styles/main.sass" as *\n`,
        silentDeprecations: true,

      },
    },
  },
})
