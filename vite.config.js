import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // cổng chạy local (tùy chọn)
  },
  build: {
    outDir: 'dist', // thư mục output cho Vercel
  },
})
