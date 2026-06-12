import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ 
  plugins: [react()],
  define: {
    '__TBB_KEY__': JSON.stringify(process.env.VITE_ANTHROPIC_API_KEY || '')
  }
})
