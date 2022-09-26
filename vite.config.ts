import { defineConfig } from 'vite'
import {join} from 'path';
import vue from '@vitejs/plugin-vue'

function resolve(dir: string) {
  return join(__dirname, dir);
}
export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  build: {
    target: 'es2015',
    // outDir: 'archives',
    assetsDir: 'pgw/assets'
  }
})
