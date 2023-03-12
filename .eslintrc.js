module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    indent: [
      'error',
      2,
      { SwitchCase: 1 }
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      { allowTemplateLiterals: true }
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    semi: ['error', 'always'],
    'no-extra-semi': 'error',
    'max-len': ['error', {
      code: 130,
      ignoreComments: true,
      ignoreTrailingComments: true
    }],
    'array-element-newline': ['error', { minItems: 3 }],
    'array-bracket-newline': ['error', { minItems: 3 }],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    'object-curly-newline': ['error', { minProperties: 2 }],
    'object-curly-spacing': ['error', 'always'],
    'function-call-argument-newline': ['error', 'never'],
    'function-paren-newline': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'never']
  }
};