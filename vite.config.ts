import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'
import checker from 'vite-plugin-checker';

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgrPlugin(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  server: {
    port: 3000,
    open: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/socket.io': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  },
  esbuild: {
    loader: 'tsx'
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
      '~scss': path.resolve(__dirname, 'src/design-system/scss/'),
      '~scss-components': path.resolve(
          __dirname,
          'src/design-system/components/'
      )
    }
  }
})
