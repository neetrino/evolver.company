import path from 'node:path';
import { defineConfig } from 'vitest/config';

export const vitestConfig = defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

export default vitestConfig;
