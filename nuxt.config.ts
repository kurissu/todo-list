// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  nitro: {
    externals: {
      inline: [], // prevent inlining of all node_modules
    }
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
