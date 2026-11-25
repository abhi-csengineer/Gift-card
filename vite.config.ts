import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const DEFAULT_SITE_ORIGIN = 'https://cardelle.online'
const resolvedSiteOrigin = (process.env.VITE_SITE_URL || '')
  .trim()
  .replace(/\/+$/, '')

function syncDistSeoOrigins(): Plugin {
  return {
    name: 'cardelle-sync-dist-seo-origins',
    apply: 'build',
    writeBundle(options) {
      if (!resolvedSiteOrigin || resolvedSiteOrigin === DEFAULT_SITE_ORIGIN) return
      const outDir = options.dir ? path.resolve(options.dir) : path.resolve('dist')
      for (const filename of ['sitemap.xml', 'robots.txt', 'index.html']) {
        const target = path.join(outDir, filename)
        if (fs.existsSync(target)) {
          const content = fs.readFileSync(target, 'utf8')
          fs.writeFileSync(
            target,
            content.split(DEFAULT_SITE_ORIGIN).join(resolvedSiteOrigin),
            'utf8',
          )
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), syncDistSeoOrigins()],
  define: {
    __APP_URL__: JSON.stringify(resolvedSiteOrigin || DEFAULT_SITE_ORIGIN),
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/react-router')) return 'router'
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor'
          }
          return undefined
        },
      },
    },
  },
})
