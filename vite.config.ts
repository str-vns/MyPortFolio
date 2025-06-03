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
        "@_": path.resolve(__dirname, 'src'),
        "@_routes": path.resolve(__dirname, 'src/routes'),
        "@_components": path.resolve(__dirname, 'src/components'),
        "@_utils": path.resolve(__dirname, 'src/utils'),
        "@_hooks": path.resolve(__dirname, 'src/hooks'),
        "@_store": path.resolve(__dirname, 'src/store'),
        "@_assets": path.resolve(__dirname, 'src/assets'),
        "@_styles": path.resolve(__dirname, 'src/styles'),
        "@_types": path.resolve(__dirname, 'src/types'),
        "@_config": path.resolve(__dirname, 'src/config'),
        "@_services": path.resolve(__dirname, 'src/services'),
        "@_shared": path.resolve(__dirname, 'src/shared'),
        "@_pages": path.resolve(__dirname, 'src/pages'),
      }
    }
})
