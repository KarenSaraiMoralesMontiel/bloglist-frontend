module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
      'cypress/globals': true // enable Cypress globals
    },
    extends: [
      'plugin:react/recommended',
      'plugin:cypress/recommended' // enable Cypress rules
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: [
      'react',
      'cypress' // enable Cypress plugin
    ],
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 'off',
      'no-console': 'off',
      'cypress/no-unnecessary-waiting': 'off', // disable unnecessary waiting warning
      'cypress/assertion-before-screenshot': 'error', // enable assertion-before-screenshot error
      'cypress/no-force': 'error', // enable no-force error
      'react/prop-types': 'off' // disable prop-types validation
    }
  };
  
  
  
  