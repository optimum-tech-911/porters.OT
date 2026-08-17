## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Change discipline

- Preserve existing copy, component dimensions, and neighboring sections when a request only targets styling or one named element. Change them only when the user explicitly asks.
- Before removing, moving, or replacing a section, audit its automatically generated CMS keys. Prevent legacy positional CMS content from being reassigned to the next section.
- After structural page edits, verify the rendered public page uses the intended headings rather than only checking the source fallback.
- Keep web-imported asset filenames URL-safe: lowercase ASCII letters, numbers, and hyphens only. Copy user uploads into `src/assets/` under a safe filename before importing them; never expose source filenames containing spaces, accents, or punctuation in generated public asset URLs. After adding an image, verify the rendered `src`/`srcset` paths and confirm every generated file has the expected image signature.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
