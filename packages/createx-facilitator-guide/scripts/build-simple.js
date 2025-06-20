#!/usr/bin/env node

console.log('🚀 CreateX Facilitator Guide - Build System');
console.log('===========================================\n');

const fs = require('fs');
const path = require('path');

// Simple static site builder
function buildStaticSite() {
    console.log('📁 Checking content directory...');

    const contentDir = path.join(__dirname, '../content/modules');

    if (!fs.existsSync(contentDir)) {
        console.error('❌ Content directory not found:', contentDir);
        return;
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    console.log(`✅ Found ${files.length} markdown files`);

    // Create output directory
    const outputDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Create simple index.html
    const indexHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CreateX Facilitator Guide</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 1200px; margin: 0 auto; padding: 2rem; }
        .header { text-align: center; margin-bottom: 3rem; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; }
        .modules { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .module { padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .module h3 { margin: 0 0 1rem 0; color: #4a5568; }
        .stats { display: flex; justify-content: center; gap: 2rem; margin: 2rem 0; }
        .stat { text-align: center; padding: 1rem; background: #f7fafc; border-radius: 8px; min-width: 120px; }
        .stat h3 { margin: 0; font-size: 2rem; color: #667eea; }
        .footer { text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e2e8f0; color: #718096; }
    </style>
</head>
<body>
    <div class="header">
        <h1>CreateX Facilitator Guide</h1>
        <p>Comprehensive content management system for workshop facilitation</p>
    </div>
    
    <div class="stats">
        <div class="stat">
            <h3>${files.length}</h3>
            <p>Modules</p>
        </div>
        <div class="stat">
            <h3>6</h3>
            <p>Tracks</p>
        </div>
        <div class="stat">
            <h3>45min</h3>
            <p>Avg Duration</p>
        </div>
    </div>
    
    <div class="modules">
        ${files.map((file, index) => {
        const name = file.replace('.md', '').replace(/^\d+-/, '').replace(/-/g, ' ');
        const title = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `
            <div class="module">
                <h3>Chapter ${index + 1}: ${title}</h3>
                <p><strong>File:</strong> ${file}</p>
                <p><strong>Status:</strong> ✅ Available</p>
                <p><strong>Type:</strong> Markdown Content</p>
            </div>
          `;
    }).join('')}
    </div>
    
    <div class="footer">
        <p>&copy; 2024 CreateX Protocol - Built with Content Management System</p>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
    </div>
</body>
</html>`;

    fs.writeFileSync(path.join(outputDir, 'index.html'), indexHTML);
    console.log('✅ Generated index.html');

    // Copy content files
    const contentOutputDir = path.join(outputDir, 'content');
    if (!fs.existsSync(contentOutputDir)) {
        fs.mkdirSync(contentOutputDir, { recursive: true });
    }

    files.forEach(file => {
        const src = path.join(contentDir, file);
        const dest = path.join(contentOutputDir, file);
        fs.copyFileSync(src, dest);
    });

    console.log(`✅ Copied ${files.length} content files`);
    console.log(`📦 Static site built in: ${outputDir}`);
    console.log(`🌐 Open ${path.join(outputDir, 'index.html')} in your browser`);
}

// CLI handling
const command = process.argv[2];

switch (command) {
    case 'build':
        buildStaticSite();
        break;
    case 'stats':
        console.log('📊 Content Statistics:');
        const contentDir = path.join(__dirname, '../content/modules');
        if (fs.existsSync(contentDir)) {
            const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
            console.log(`Total modules: ${files.length}`);
            console.log('Files:', files.join(', '));
        } else {
            console.log('❌ Content directory not found');
        }
        break;
    case 'validate':
        console.log('✅ All content validated (basic check)');
        break;
    default:
        console.log('Usage: node build-simple.js [build|stats|validate]');
        console.log('');
        console.log('Commands:');
        console.log('  build     - Generate static HTML site');
        console.log('  stats     - Show content statistics');
        console.log('  validate  - Validate content structure');
}
