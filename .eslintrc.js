// credits:
// https://dev.to/robertcoopercode/using-eslint-and-prettier-in-a-typescript-project-53jb
// https://www.npmjs.com/package/fork-ts-checker-webpack-plugin
// https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
// https://github.com/prettier/eslint-config-prettier

// Used to be a copy of:
// https://github.com/wesbos/eslint-config-wesbos/blob/master/.eslintrc.js

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'airbnb',

        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        'prettier',
        'prettier/react',
        // Uses eslint-config-prettier to disable ESLint rules from
        // @typescript-eslint/eslint-plugin that would conflict with prettier
        'prettier/@typescript-eslint',
        // Enables eslint-plugin-prettier and displays prettier errors as
        // ESLint errors. This must be always the last configuration.
        'plugin:prettier/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        // credit: https://www.gatsbyjs.org/docs/eslint/
        __PATH_PREFIX__: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react', 'prettier'],
    settings: {
        react: {
            // Tells eslint-plugin-react to automatically detect the version of
            // React to use
            version: 'detect',
        },
    },
    rules: {
        'react/jsx-key': 'warn',
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.tsx', '.jsx'],
            },
        ],
        'react/jsx-indent': [
            'error',
            4,
            {
                checkAttributes: true,
                indentLogicalExpressions: true,
            },
        ],

        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array-simple',
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/restrict-plus-operands': 'error',

        'import/extensions': [
            'error',
            'never',
            {
                json: 'always',
            },
        ],
    },
};
