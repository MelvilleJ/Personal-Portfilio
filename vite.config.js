import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
const apiProxy = {
  "/api": process.env.CONTACT_API_URL ?? "http://127.0.0.1:8787",
};

export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  server: { proxy: apiProxy },
  preview: { proxy: apiProxy },
});
