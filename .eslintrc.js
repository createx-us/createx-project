module.exports = {
    root: true,
    extends: [
        "eslint:recommended",
        "@typescript-eslint/recommended",
        "prettier"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint"],
    env: {
        node: true,
        es6: true
    },
    rules: {
        // General rules
        "no-console": "warn",
        "no-debugger": "error",
        "no-unused-vars": "off", // Handled by @typescript-eslint
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-non-null-assertion": "warn",

        // Best practices
        "prefer-const": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-template": "error",
        "prefer-arrow-callback": "error",
        "arrow-spacing": "error",
        "no-duplicate-imports": "error"
    },
    overrides: [
        {
            // Frontend React rules
            files: ["packages/frontend/**/*.{ts,tsx}", "packages/website/**/*.{ts,tsx}"],
            extends: [
                "eslint:recommended",
                "@typescript-eslint/recommended",
                "prettier"
            ],
            env: {
                browser: true,
                es6: true
            },
            rules: {
                // React specific rules would go here
                "no-console": "warn"
            }
        },
        {
            // Backend Node.js rules
            files: ["packages/backend/**/*.ts"],
            env: {
                node: true,
                es6: true
            },
            rules: {
                "no-console": "off" // Console logs are OK in backend
            }
        },
        {
            // Smart contract Solidity files
            files: ["packages/smart-contracts/**/*.sol"],
            parser: null, // Don't parse Solidity with TypeScript parser
            rules: {
                // Disable all rules for Solidity files (use solhint instead)
            }
        },
        {
            // Test files
            files: ["**/*.test.{ts,tsx,js,jsx}", "**/*.spec.{ts,tsx,js,jsx}"],
            env: {
                jest: true
            },
            rules: {
                "@typescript-eslint/no-explicit-any": "off",
                "no-console": "off"
            }
        }
    ],
    ignorePatterns: [
        "node_modules/",
        "dist/",
        "build/",
        ".next/",
        ".expo/",
        "coverage/",
        "artifacts/",
        "cache/",
        "typechain-types/"
    ]
};
