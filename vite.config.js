import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * GitHub Pages base path:
 * - Project site: https://<user>.github.io/<repo>/  →  base must be "/<repo>/"
 * - User/org root: https://<user>.github.io/        →  base is "/"
 *
 * Set VITE_BASE_PATH in .env.production, or one-shot: VITE_BASE_PATH=/MyRepo/ npm run build
 * In GitHub Actions, GITHUB_REPOSITORY supplies the repo slug when VITE_BASE_PATH is unset.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const repoSlug = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
  const base =
    env.VITE_BASE_PATH ||
    (repoSlug ? `/${repoSlug}/` : '/puzzles/')

  return {
    plugins: [
      react(),
      // Same-origin GitHub Pages assets do not need crossorigin; some browsers mishandle module + crossorigin.
      {
        name: 'strip-html-crossorigin',
        transformIndexHtml: {
          order: 'post',
          handler(html) {
            return html.replace(/\s+crossorigin(?:="anonymous")?/gi, '')
          },
        },
      },
    ],
    base,
    resolve: {
      dedupe: ['react', 'react-dom'],
      /**
       * Vite 7 can throw "Failed to resolve entry for package …" for deps whose
       * package.json entry points fail fs resolution (Windows / OneDrive / hoisting).
       * Pin explicit ESM/CJS files so dev + build always resolve.
       */
      alias: {
        'mobx-react-lite': path.resolve(
          __dirname,
          'node_modules/mobx-react-lite/es/index.js',
        ),
        mobx: path.resolve(__dirname, 'node_modules/mobx/dist/mobx.esm.js'),
        'fast-printf': path.resolve(
          __dirname,
          'node_modules/fast-printf/dist/src/printf.js',
        ),
      },
    },
    optimizeDeps: {
      include: ['mobx', 'mobx-react-lite', 'fast-printf'],
    },
    build: {
      rollupOptions: {
        input: {
          main: 'index.html',
          scurry: 'puzzlegames/scurry/index.html',
          folds: 'puzzlegames/folds/index.html',
          sumtiles: 'puzzlegames/sumtiles/index.html',
          productiles: 'puzzlegames/productiles/index.html',
          factorfall: 'puzzlegames/factorfall/index.html',
          clueless: 'puzzlegames/clueless/index.html',
          allten: 'puzzlegames/allten/index.html',
        },
      },
    },
  }
})
