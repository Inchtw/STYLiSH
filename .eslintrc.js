module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'rules': {
        'linebreak-style': ['error', 'unix'],
        'no-trailing-spaces': ['error'],
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        'indent': ['error', 4],
        curly: ['error', 'all']
    }
};
