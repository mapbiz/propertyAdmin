// vite.config.js
import { defineConfig } from "file:///D:/properyAdminNEW/node_modules/vite/dist/node/index.js";
import react from "file:///D:/properyAdminNEW/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api*": {
        target: "https://develop-mapbiz.ru/api/v1/*",
        rewrite: (path) => path.replace(/^\/api/, ""),
        changeOrigin: true
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
      credentials: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9wZXJ5QWRtaW5ORVdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHByb3BlcnlBZG1pbk5FV1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvcGVyeUFkbWluTkVXL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge1xyXG4gICAgICBcIi9hcGkqXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzc5LjE3NC44Mi4xNzo4MDgwL2FwaS92MS8qXCIsXHJcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcclxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgLy8gc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAvLyBjb25maWd1cmU6IChwcm94eSwgX29wdGlvbnMpID0+IHtcclxuICAgICAgICAvLyAgIHByb3h5Lm9uKCdlcnJvcicsIChlcnIsIF9yZXEsIF9yZXMpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3Byb3h5IGVycm9yJywgZXJyKTtcclxuICAgICAgICAvLyAgIH0pO1xyXG4gICAgICAgIC8vICAgcHJveHkub24oJ3Byb3h5UmVxJywgKHByb3h5UmVxLCByZXEsIF9yZXMpID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0ZXN0XCIpXHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdTZW5kaW5nIFJlcXVlc3QgdG8gdGhlIFRhcmdldDonLCBwcm94eVJlcSk7XHJcbiAgICAgICAgLy8gICB9KTtcclxuICAgICAgICAvLyAgIHByb3h5Lm9uKCdwcm94eVJlcycsIChwcm94eVJlcywgcmVxLCBfcmVzKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBSZXNwb25zZSBmcm9tIHRoZSBUYXJnZXQ6JywgcHJveHlSZXMuc3RhdHVzQ29kZSwgcmVxLnVybCk7XHJcbiAgICAgICAgLy8gICB9KTtcclxuICAgICAgICAvLyB9LFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNvcnM6IHtcclxuICAgICAgb3JpZ2luOiBcIipcIixcclxuICAgICAgbWV0aG9kczogXCIqXCIsXHJcbiAgICAgIGNyZWRlbnRpYWxzOiB0cnVlLFxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0TyxTQUFTLG9CQUFvQjtBQUN6USxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM1QyxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWNoQjtBQUFBLElBQ0Y7QUFBQSxJQUVBLE1BQU07QUFBQSxNQUNKLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
