import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";
