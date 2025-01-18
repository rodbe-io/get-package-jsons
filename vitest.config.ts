import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const _dirname = dirname(fileURLToPath(import.meta.url));

// eslint-disable-next-line no-restricted-exports
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(_dirname, 'src'),
    },
  },
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    environment: 'node',
    globals: true,
  },
});
