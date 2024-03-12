import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: "http://79.174.82.17:8080/auth/login",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/login/, ''),
        // configure: (proxy) => {
        //   proxy.on('proxyReq', t => {
        //     console.log(t);
        //   })
        // }
      },
      "^/auth/.*": {
        target: "http://79.174.82.17:8080/auth",
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      "^/api/.*": {
        target: "http://79.174.82.17:8080/api/v1/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // secure: false,
        // configure: (proxy, _options) => {
        //   proxy.on('error', (err, _req, _res) => {
        //     console.log('proxy error', err);
        //   });
        //   proxy.on('proxyReq', (proxyReq, req, _res) => {
        //     console.log("test")
        //     console.log('Sending Request to the Target:', proxyReq);
        //   });
        //   proxy.on('proxyRes', (proxyRes, req, _res) => {
        //     console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
        //   });
        // },
      }
    },
    
    cors: {
      origin: "*",
      methods: "*",
      credentials: true,
    }
  }
})
