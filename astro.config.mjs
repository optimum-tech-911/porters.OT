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
  // The two retired expertise domains keep working for anything already linking
  // or indexing them, rather than turning into 404s.
  redirects: {
    '/expertises/developpement-integration': '/expertises',
    '/expertises/product-project-management': '/expertises',
    // Pages retirées : le contenu vit désormais ailleurs, les URLs restent valides.
    '/tarifs': '/portage-salarial',
    '/livres-blancs': '/blog',
    '/livres-blancs/guide-complet-portage-salarial': '/blog/guide-portage-salarial',
    '/livres-blancs/comparatif-statuts-freelances': '/blog/choisir-statut-independant',
    '/livres-blancs/checklist-demarrer-portage-salarial': '/blog/guide-portage-salarial',
  },
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
      // Keep all shared island dependencies in the initial graph. Re-optimizing
      // Supabase after pages load expires imports held by existing browser tabs.
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime', '@supabase/supabase-js'],
    },
  },
});
