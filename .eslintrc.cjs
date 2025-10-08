module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  rules: {
    // Limite de líneas por archivo
    'max-lines': ['warn', { max: 300, skipBlankLines: true, skipComments: true }],

    // Buenas prácticas generales
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['warn'],

    // Mantén Prettier como fuente de verdad
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 100,
        tabWidth: 2,
        trailingComma: 'es5',
        endOfLine: 'lf'
      }
    ]
  },
  settings: {
    react: { version: 'detect' }
  }
}
