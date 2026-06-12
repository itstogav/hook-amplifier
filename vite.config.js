import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ 
  plugins: [react()],
  define: {
    'window.__TBB_KEY__': JSON.stringify(process.env.ANTHROPIC_API_KEY || '')
  }
})
