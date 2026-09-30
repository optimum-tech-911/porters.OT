// @ts-check
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

/** @type {import('astro').AstroIntegration} */
const syncRootSitemap = {
  name: 'the-porters-root-sitemap',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      // Astro's sitemap integration emits sitemap-0.xml during the build.
      // Publish the same URL set at the conventional /sitemap.xml path and
      // retain a copy in public/ so the path also works in the dev server.
      const generatedSitemap = fileURLToPath(new URL('sitemap-0.xml', dir));
      await copyFile(generatedSitemap, fileURLToPath(new URL('sitemap.xml', dir)));
      await copyFile(generatedSitemap, fileURLToPath(new URL('./public/sitemap.xml', import.meta.url)));
    },
  },
};

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
        // Keep the sitemap aligned with pages that search engines may index.
        // Admin and client-space URLs must remain crawlable so their noindex
        // directives can be read, but they should never be suggested here.
        const { pathname } = new URL(page);
        return pathname !== '/404'
          && pathname !== '/espace-client'
          && pathname !== '/admin'
          && !pathname.startsWith('/admin/');
      },
    }),
    syncRootSitemap,
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
