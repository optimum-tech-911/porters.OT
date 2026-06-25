// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.porters.fr',
  trailingSlash: 'never',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        // Exclude non-indexable pages from sitemap
        const excludePatterns = [
          '/mentions-legales',
          '/confidentialite',
          '/admin',
        ];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});