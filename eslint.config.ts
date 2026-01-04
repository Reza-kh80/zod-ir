import { defineConfig } from '@shayanthenerd/eslint-config';

export default defineConfig({
  autoDetectDeps: 'verbose',
  global: {
    ignores: ['src/index.ts', 'src/modules/**/*.ts'],
  },
  configs: {
    test: {
      storybook: false,
    },
    stylistic: {
      useTabs: false,
    },
    typescript: {
      overrides: {
        rules: {
          /* [TODO] Enable all of them after enabling `strictNullChecks` in tsconfig.json. */
          '@typescript-eslint/no-unnecessary-condition': 'off',
          '@typescript-eslint/prefer-nullish-coalescing': 'off',
          '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        },
      },
    },
    base: {
      overrides: {
        rules: {
          'no-shadow': 'off',
          'max-lines': 'off',
          'no-continue': 'off',
        },
      },
    },
  },
});
