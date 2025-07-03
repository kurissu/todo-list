// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel', // or 'vercel' for Node.js runtime
    experimental: {
      wasm: true
    }
  },
  // Ensure ES modules compatibility
  build: {
    transpile: ['better-auth'] // Add any problematic packages here
  },
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false
  },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/ui"],
});
