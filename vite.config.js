import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// Root-domain deployment. See docs/DEPLOYMENT.md for subdirectory hosting.
export default defineConfig({ plugins: [vue()], base: '/' });
