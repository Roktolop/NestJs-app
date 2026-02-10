// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'eslint.config.mjs'],
  },
  js.configs.recommended, // базовые правила ESLint
  ...tseslint.configs.recommendedTypeChecked, // TypeScript с проверкой типов
  eslintPluginPrettierRecommended, // Prettier интегрируется в ESLint
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // TS специфичные правила
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Prettier — основной источник форматирования
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // одинарные кавычки для кода
          semi: true,
          trailingComma: 'all',
          endOfLine: 'lf',
        },
      ],

      // ESLint для кавычек
      quotes: [
        'error',
        'single', // основной стиль — одинарные
        {
          avoidEscape: true, // двойные кавычки разрешены, если нужно экранирование
          allowTemplateLiterals: true,
        },
      ],
    },
  },
);
