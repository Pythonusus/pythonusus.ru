import { resolve } from "node:path";
import { defineConfig } from "vite";

// Routes that should resolve normally in dev.
const knownRoutes = new Set(["/", "/index.html", "/about", "/about.html"]);

export default defineConfig({
  // Treat "src" as project root where HTML entry files live.
  root: "src",
  // Static assets are served from ../public.
  publicDir: "../public",
  build: {
    // Build output goes to repo-level dist directory.
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Multi-page app entries.
        index: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
        404: resolve(__dirname, "src/404.html"),
      },
    },
  },
  server: {
    // Dev server URL: http://localhost:3000
    // Explicit Docker/WSL-friendly settings for HMR + file watching.
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      // Polling is more reliable for bind mounts on Docker Desktop/WSL.
      usePolling: true,
      interval: 120,
    },
    hmr: {
      // Browser connects from host machine, not from inside container.
      host: "localhost",
      clientPort: 3000,
      protocol: "ws",
    },
  },
  plugins: [
    {
      // Dev-only middleware: rewrite unknown HTML routes to /404.html.
      name: "dev-404-fallback",
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          // Ignore non-page requests.
          if (req.method !== "GET") return next();

          const accept = req.headers.accept || "";
          // Process only browser page navigations.
          if (!accept.includes("text/html")) return next();

          // Strip query string and keep path only.
          const url = (req.url || "").split("?")[0];
          // Let known routes and direct file requests pass through.
          if (knownRoutes.has(url) || url.includes(".")) return next();

          // Unknown page path -> custom 404 page in dev.
          req.url = "/404.html";
          next();
        });
      },
    },
  ],
});
