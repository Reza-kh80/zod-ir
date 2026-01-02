import { defineConfig } from 'tsdown';

export default defineConfig({
  format: ['cjs', 'esm'],
  minify: true,
  sourcemap: true,
  unused: true,
  publint: true,
});
