// Simple test script to verify content system
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing content system...');

// Check if content directory exists
const contentDir = path.join(__dirname, '../content/modules');
console.log('Content directory:', contentDir);

if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir);
    console.log('📚 Found files:', files);

    // Test reading a file
    const markdownFiles = files.filter(f => f.endsWith('.md'));
    console.log('📄 Markdown files:', markdownFiles.length);

    if (markdownFiles.length > 0) {
        const firstFile = path.join(contentDir, markdownFiles[0]);
        const content = fs.readFileSync(firstFile, 'utf8');
        console.log('📖 Sample content length:', content.length, 'characters');
        console.log('✅ Content system is working!');
    }
} else {
    console.log('❌ Content directory not found');
}

// Test dependencies
console.log('\n🔍 Testing dependencies...');
try {
    require('gray-matter');
    console.log('✅ gray-matter installed');
} catch (e) {
    console.log('❌ gray-matter missing');
}

try {
    require('remark');
    console.log('✅ remark installed');
} catch (e) {
    console.log('❌ remark missing');
}

try {
    require('commander');
    console.log('✅ commander installed');
} catch (e) {
    console.log('❌ commander missing');
}

try {
    require('chalk');
    console.log('✅ chalk installed');
} catch (e) {
    console.log('❌ chalk missing');
}

console.log('\n✅ Test completed!');
