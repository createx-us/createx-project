#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directory containing worker route files
const routesDir = path.join(__dirname, 'workers/api/routes');

// Get all TypeScript files in the routes directory
const files = fs.readdirSync(routesDir).filter(file => file.endsWith('.ts'));

files.forEach(file => {
    const filePath = path.join(routesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Skip files that already have type assertions
    if (content.includes('as any') && file === 'analytics.ts') {
        console.log(`Skipping ${file} - already has type assertions`);
        return;
    }

    // Add type assertions to database queries
    const patterns = [
        {
            pattern: /(\s+await\s+\w+\.(?:bind\([^)]+\)\.)?first\(\))/g,
            replacement: '$1 as any'
        },
        {
            pattern: /(\s+await\s+\w+\.(?:bind\([^)]+\)\.)?all\(\))/g,
            replacement: '$1 as any'
        }
    ];

    let modified = false;
    patterns.forEach(({ pattern, replacement }) => {
        const newContent = content.replace(pattern, replacement);
        if (newContent !== content) {
            content = newContent;
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed type assertions in ${file}`);
    } else {
        console.log(`No changes needed in ${file}`);
    }
});

console.log('Database type assertion fix complete!');
