import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Reglas de calidad de código
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off', // Desactivado porque TypeScript lo maneja mejor
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prefer-const': 'error',
      'no-var': 'error',

      // Reglas de formato (manejadas por Prettier, pero útiles para casos edge)
      semi: ['error', 'always'],
      quotes: ['error', 'single', { allowTemplateLiterals: true }],

      // Reglas específicas de React/Next.js
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/exhaustive-deps': 'warn',

      // Reglas de accesibilidad
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
    },
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
    ],
  },
];

export default eslintConfig;
