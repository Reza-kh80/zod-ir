import type { Config } from 'prettier';

import prettierConfig from '@shayanthenerd/eslint-config/prettier';

export default {
  ...prettierConfig,
  useTabs: false,
} satisfies Config;
