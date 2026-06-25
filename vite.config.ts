import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";

/** GitHub Pages 子路径部署：quwang86-debug.github.io/wangan/ */
const base = process.env.GITHUB_PAGES === "true" ? "/wangan/" : "/";

export default defineConfig({
  base,
  plugins: [vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
