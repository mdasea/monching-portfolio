import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://monching-desierto.vercel.app',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
