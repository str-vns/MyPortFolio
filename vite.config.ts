import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { config } from 'dotenv';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

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
    },
    resolve: {
      alias: {
        "@_/": path.resolve(__dirname, 'src'),
        "@_/routes": path.resolve(__dirname, 'src/routes'),
        "@_/components": path.resolve(__dirname, 'src/components'),
        "@_/utils": path.resolve(__dirname, 'src/utils'),
        "@_/hooks": path.resolve(__dirname, 'src/hooks'),
        "@_/store": path.resolve(__dirname, 'src/store'),
        "@_/assets": path.resolve(__dirname, 'src/assets'),
        "@_/styles": path.resolve(__dirname, 'src/styles'),
        "@_/types": path.resolve(__dirname, 'src/types'),
        "@_/config": path.resolve(__dirname, 'src/config'),
        "@_/services": path.resolve(__dirname, 'src/services'),
        "@_/shared": path.resolve(__dirname, 'src/shared'),
        "@_/pages": path.resolve(__dirname, 'src/pages'),
        "@_/lib/utils": path.resolve(__dirname, 'src/lib/utils'),
        "@_/data": path.resolve(__dirname, 'src/data'),
        "@_/stores": path.resolve(__dirname, 'src/stores'),
        "@_/storage": path.resolve(__dirname, 'src/storage'),
      }
    }
})
