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
        "only-arrow-functions": false,
        "no-console": false,
        "no-bitwise": false,
        "jsx-boolean-value": ["never"],
        "no-var-requires": false,
        "max-classes-per-file": false,
        "member-access": [true, "no-public"],
        "interface-name": false,
        "object-literal-sort-keys": [true, "ignore-case"],
    }
};
