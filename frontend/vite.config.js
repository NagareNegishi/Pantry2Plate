/// <reference types="vitest/config" />
/**
 * If you are already using Vite, add test property in your Vite config.
 * Need to add a reference to Vitest types using a triple slash directive at the top of your config file.
 */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// for tailwindcss
import tailwindcss from '@tailwindcss/vite'
// for shadcn/ui
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // for shadcn/ui
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  test: {
    environment: 'jsdom',
    // globals: true, // if I want to skip importing 'describe', 'it', 'expect' in each test file
    setupFiles: ['./vitest.setup.ts'], // it runs this file before each test file
  },
})
