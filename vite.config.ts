import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { config } from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

config({ path: '.env'
})
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true}),
    tailwindcss(),
    react()],
    define: {
      'process.env': process.env
    }
})
