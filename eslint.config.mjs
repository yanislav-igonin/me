import next from 'eslint-config-next';

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'],
  },
  ...next,
  {
    rules: {
      'semi': 'error',
      'eol-last': 'error',
      'quotes': ['error', 'single', { avoidEscape: true }],
    },
  },
];

export default config;
