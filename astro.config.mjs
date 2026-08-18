// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://thiago662.github.io',
  // build direto na pasta que o GitHub Pages serve (repo thiago662.github.io, branch main)
  outDir: 'docs',
});
