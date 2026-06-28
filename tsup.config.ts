import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: {
      index: "src/index.ts",
      "vue/index": "src/vue/index.ts"
    },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    external: ["vue"]
  },
  {
    entry: {
      browser: "src/browser.ts"
    },
    format: ["iife"],
    globalName: "HoverRepel",
    sourcemap: true,
    clean: false,
    dts: false,
    platform: "browser"
  }
]);