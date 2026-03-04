import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        scurry: 'puzzlegames/scurry/index.html',
        folds: 'puzzlegames/folds/index.html',
      }
    }
  }
})
