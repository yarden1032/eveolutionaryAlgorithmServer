import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Preserve the directory configured in the existing Netlify site.
    outDir: 'build',
  },
});
