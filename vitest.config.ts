import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "setup.ts",
    exclude: ["proxy", "node_modules"]
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
})