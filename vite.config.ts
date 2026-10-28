import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// True SPA build — outputs static HTML to dist/ with index.html for publisher deployment
export default defineConfig({
  base: "./",
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  optimizeDeps: {
    exclude: ["gsap", "@gsap/react"],
  },
});
