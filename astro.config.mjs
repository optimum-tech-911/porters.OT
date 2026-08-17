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
          '/blog/categorie/actualites',
          '/admin',
        ];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Keep every hydrated Astro island on the same React runtime.
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      // Force the admin islands and their development JSX helpers through the
      // same pre-bundled React runtime. This prevents stale `_jsxDEV` exports
      // from blanking the admin shell during local development.
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      force: true,
    },
  },
});
