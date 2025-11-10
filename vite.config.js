import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Vercel sẽ build từ thư mục này
  },
  base: './', // giúp Vercel định vị đúng đường dẫn tài nguyên
})
