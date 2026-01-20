/// <reference types="vitest/config" />
/**
 * If you are already using Vite, add test property in your Vite config.
 * Need to add a reference to Vitest types using a triple slash directive at the top of your config file.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    // globals: true,
    // setupFiles: './src/setupTests.ts',
  },
})
