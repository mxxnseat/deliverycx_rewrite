module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "only-arrow-functions": 0,
        "react/react-in-jsx-scope": 0,
        "no-console": 0,
        "no-bitwise": 0,
        "jsx-boolean-value": 0,
        "no-var-requires": 0,
        "max-classes-per-file": 0,
        "member-access": 0,
        "interface-name": 0,
        "object-literal-sort-keys": 0,
        
    }
};
