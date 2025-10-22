import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
export default defineConfig({
  site: "https://billwear.github.io",
  outDir: "dist",
  integrations: [tailwind({ applyBaseStyles: false })]
});
