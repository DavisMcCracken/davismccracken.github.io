// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://davismccracken.github.io',
  integrations: [react()],
  markdown: {
    shikiConfig: { theme: 'tokyo-night' },
  },

  vite: {
    plugins: [tailwindcss()]
  }
});