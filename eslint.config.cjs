const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const globals = require('globals');
const playwright = require('eslint-plugin-playwright');
 
const tsRecommended = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: ['**/*.ts'],
}));
 
module.exports = [
  {
    ignores: [
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'blob-report/**',
      'coverage/**',
      'dist/**',
      'mocks/**/*.har',
      'mocks/**/*.har.zip',
    ],
  },
 
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
 
  {
    files: ['eslint.config.cjs', '*.config.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
 
  {
    files: ['web/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser,
        productos: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
      'no-empty': [
        'warn',
        {
          allowEmptyCatch: true,
        },
      ],
    },
  },
 
  ...tsRecommended,
 
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          caughtErrors: 'all',
        },
      ],
    },
  },
 
  {
    files: ['tests/**/*.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/expect-expect': 'off',
      'playwright/consistent-spacing-between-blocks': 'off',
    },
  },
];
