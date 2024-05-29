/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from 'vitest/config';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    globals: true,
    setupFiles: "./test/setup.ts",
    coverage: {
      exclude: ["src/components/main", "src/theme", "src/router", "src/redux", "src/components/utils/localStorage.ts"],
      include: ["src/**/*.tsx"],
      reporter: ["text", "lcov"],
    }
  }

})
