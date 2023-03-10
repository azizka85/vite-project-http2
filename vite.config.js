import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    server: {
      port: env.PORT,
      host: true
    },
    preview: {
      port: env.PORT,
      host: true
    }
  }
})