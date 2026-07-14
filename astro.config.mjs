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
          '/rse',
          '/admin',
        ];
        return !excludePatterns.some((pattern) => page.includes(pattern));
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Keep every hydrated Astro island on the same React runtime. This also
      // prevents a stale optimized dependency from mixing jsx-dev-runtime and
      // React instances after dependency or Vite configuration changes.
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },
});
