import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import "dotenv/config";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: (process.env.APP_BASE).toString().length > 0 ? process.env.APP_BASE: '/',
  publicDir: resolve('./public'),
  preview: {
    port: process.env.APP_PORT
  },
  server: {
    port: process.env.APP_PORT,
    proxy: {
      '^/public/.*': {
        target: `${process.env.VITE_SERVER_URL}/public`,
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/public/, ''),
      },
      '^/auth/.*': {
        target: `${process.env.VITE_SERVER_URL}/auth`,
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      "^/api/.*": {
        target: `${process.env.VITE_API_URL}`,
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    
    cors: {
      origin: "*",
      methods: "*",
      credentials: true,
      
    }
  }
})
