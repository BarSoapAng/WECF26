import { createServer, defineConfig, type ViteDevServer } from 'vite'
import { readFile } from 'node:fs/promises'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'initial-loader',
    configureServer(server) { loaderServer = server },
    async transformIndexHtml(html) {
      const server = loaderServer ?? await createServer({ configFile: false, server: { middlewareMode: true }, ssr: { noExternal: ['styled-components'] } })
      try {
        const { renderLoader } = await server.ssrLoadModule('/src/lib/renderLoader.tsx')
        const { markup, styles } = renderLoader()
        // Embed the small existing body font so the initial copy never waits for CSS or a font request.
        const font = await readFile(new URL('./public/font/host-grotesk-latin.woff2', import.meta.url))
        const fontStyle = `<style>@font-face{font-family:"Host Grotesk";src:url(data:font/woff2;base64,${font.toString('base64')}) format("woff2");font-weight:300 800;font-style:normal;font-display:swap}</style>`
        return html.replace('<!-- loader-styles -->', fontStyle + styles).replace('<!-- loader-copy -->', markup)
      } finally {
        if (!loaderServer) await server.close()
      }
    },
  }],
  ssr: { noExternal: ['styled-components'] },
  resolve: {
    alias: {
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
})

let loaderServer: ViteDevServer | undefined
