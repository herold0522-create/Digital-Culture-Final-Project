import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ⚠️ 这一行最关键：必须和你的仓库名一模一样
  base: '/Digital-Culture-Final-Project/', 
})