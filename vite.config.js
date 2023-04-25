import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

const root=resolve(__dirname,'src')
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        cams: resolve(root,'cams.html'),
        dashboard: resolve(root,'dashboard.html'),
        history: resolve(root,'history.html'),
        notifications: resolve(root,'notifications.html'),
        onboard: resolve(root,'onboard.html'),
      },
    },
  }
})
