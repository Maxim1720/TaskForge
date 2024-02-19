import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      "/api" : {
        // target: "http://localhost:8000",
        target: "http://backend:80",
        changeOrigin: true,
        secure: false,
        ws: true
        // rewrite : (path)=> path.replace("/^\/api/", '/api/')
        // rewrite : (path)=> path.replace("", '')
      }
    }
  }
})
