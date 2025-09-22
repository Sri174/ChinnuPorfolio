import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
// import EnvironmentPlugin from 'vite-plugin-environment' // Removed

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: 'automatic' }), tailwindcss() /*, EnvironmentPlugin('all')*/], // Removed EnvironmentPlugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175
  }
});
