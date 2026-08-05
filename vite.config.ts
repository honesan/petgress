import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const codespacesDomain =
  process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/petgress/",
  server: {
    host: "0.0.0.0",
    allowedHosts: codespacesDomain
      ? [`.${codespacesDomain}`]
      : [],
  },
  preview: {
    host: "0.0.0.0",
  },
});