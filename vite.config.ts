import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/antonyhysonseltran-portfolio/', // <--- ADDED/UPDATED THIS LINE
  plugins: [react()],
  // You can optionally add these if you've been using them or for local development:
  server: {
    host: true, // This allows the server to be accessed from network interfaces (e.g., if testing on another device on local network)
    port: 5173, // Default Vite port, can be changed
  },
  build: {
    outDir: 'dist', // Ensures build output goes to 'dist' folder
  },
})