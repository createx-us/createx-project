module.exports = {
    semi: true,
    trailingComma: "es5",
    singleQuote: false,
    printWidth: 80,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "avoid",
    endOfLine: "lf",
    overrides: [
        {
            files: "*.sol",
            options: {
                printWidth: 120,
                tabWidth: 4,
                singleQuote: false,
            },
        },
        {
            files: "*.md",
            options: {
                printWidth: 100,
                proseWrap: "always",
            },
        },
    ],
};
