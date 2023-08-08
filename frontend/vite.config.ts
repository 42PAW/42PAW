import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  server: {
    host: "0.0.0.0",
    port: 2424,
    strictPort: true,
    hmr: {
      port: 2424,
      clientPort: 2424,
      host: "localhost",
      path: "/hmr/",
    },
  },
});
