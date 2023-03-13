import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslint from "vite-plugin-eslint";

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  base: "./",
  build: {
    sourcemap: true
  },

  plugins: [uni(), eslint({ cache: true })]
});
