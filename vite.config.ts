import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "car-rental.pl",
    port: 5173,
    https: {
      key: "certs/car-rental.pl+2-key.pem",
      cert: "certs/car-rental.pl+2.pem",
    },
  },
});
