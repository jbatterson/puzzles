import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/puzzles/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        scurry: 'puzzlegames/scurry/index.html',
        folds: 'puzzlegames/folds/index.html',
        sumtiles: 'puzzlegames/sumtiles/index.html',
        productiles: 'puzzlegames/productiles/index.html',
      }
    }
  }
})
