/// <reference types="vitest" />
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude],
    globals: true,
    setupFiles: "./src/components/test/setup.ts",
    coverage: {
      exclude: ["src/components/main", "src/theme", "src/router", "src/components/common", "src/redux", "src/components/utils/localStorage.ts"],
      include: ["src/"],
      reporter: ["text", "lcov"],
    },
  },
});