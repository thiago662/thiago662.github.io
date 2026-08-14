// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: confirmar URL final de deploy (GitHub Pages) antes de publicar
  site: 'https://thiago662.github.io',
  // build direto na pasta que o GitHub Pages já serve neste repo
  outDir: 'docs',
});
